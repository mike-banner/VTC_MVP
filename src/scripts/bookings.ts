import { supabase } from "@/lib/supabase/client";
import QRCode from "qrcode";
import { calculatePrice, findPricingRule, type PricingRule } from "@/lib/pricing";


type AnyBooking = Record<string, unknown> & {
  id?: string;
  pickup_time?: string;
  pickup_address?: string;
  dropoff_address?: string;
  passenger_count?: number;
  luggage_count?: number;
  total_amount?: number | string;
  status?: string;
  mission_status?: string;
  booking_type?: string;
  mission_note?: string;
  notes?: string;
  rating?: number | null;
  rating_comment?: string | null;
  customers?: {
    first_name?: string;
    last_name?: string;
    phone?: string;
  };
};

const parseBookingFromRow = (row: Element): AnyBooking => {
  const encodedData = row.getAttribute("data-booking") ?? "";
  if (!encodedData) return {};
  try {
    return JSON.parse(decodeURIComponent(encodedData)) as AnyBooking;
  } catch {
    return {};
  }
};

const updateTerrainUI = (booking: AnyBooking): void => {
  const root = document.getElementById("mission-cockpit-root");
  if (!root) return;

  const notes = (booking.mission_note ?? "") as string;
  const status = (booking.mission_status ?? "") as string;
  const hasTag = (tag: string): boolean => notes.includes(`[terrain] ${tag}_at=`);

  const isEnRoute = hasTag("en_route");
  const isOnBoard = hasTag("on_board");
  const isCompleted = status === "completed";

  if (isCompleted || status === "cancelled") {
    root.innerHTML = "";
    return;
  }

  const pickupTime = booking.pickup_time ? new Date(booking.pickup_time) : null;
  const pickupMs = pickupTime && !Number.isNaN(pickupTime.getTime()) ? pickupTime.getTime() : null;
  const availableAtMs = pickupMs ? pickupMs - 15 * 60 * 1000 : null;
  const canStart = availableAtMs ? Date.now() >= availableAtMs : true;

  root.innerHTML = `
    <div class="mt-6 space-y-2.5">
      <div class="flex items-center justify-between mb-3">
        <p class="text-[10px] font-black uppercase tracking-widest text-slate-500">Pilotage</p>
        ${!canStart && !isEnRoute && availableAtMs ? `
          <div class="px-2.5 py-1 bg-amber-500/8 rounded-lg border border-amber-500/20 text-[9px] font-black text-amber-400 uppercase tracking-wide tabular-nums">
            Disponible à ${new Date(availableAtMs).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
          </div>
        ` : ""}
      </div>
      <div class="grid grid-cols-3 gap-2">
        <button id="btn-en-route" ${isEnRoute || !canStart ? "disabled" : ""}
          class="flex items-center justify-center gap-2 min-h-[52px] px-2 rounded-xl border transition-all
            ${isEnRoute
              ? "bg-indigo-600 border-indigo-500 text-white"
              : "bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/5 hover:text-slate-200"}
            disabled:opacity-25 disabled:cursor-not-allowed">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="text-[10px] font-black uppercase tracking-tight leading-none">En route</span>
        </button>
        <button id="btn-on-board" ${isOnBoard || !isEnRoute ? "disabled" : ""}
          class="flex items-center justify-center gap-2 min-h-[52px] px-2 rounded-xl border transition-all
            ${isOnBoard
              ? "bg-emerald-600 border-emerald-500 text-white"
              : "bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/5 hover:text-slate-200"}
            disabled:opacity-25 disabled:cursor-not-allowed">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="text-[10px] font-black uppercase tracking-tight leading-none">À bord</span>
        </button>
        <button id="btn-complete" ${!isOnBoard ? "disabled" : ""}
          class="flex items-center justify-center gap-2 min-h-[52px] px-2 rounded-xl border transition-all
            bg-white/[0.03] border-white/10 text-slate-400
            hover:bg-rose-600/20 hover:border-rose-500/40 hover:text-rose-400
            disabled:opacity-25 disabled:cursor-not-allowed">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-[10px] font-black uppercase tracking-tight leading-none">Terminée</span>
        </button>
      </div>
    </div>
  `;

  const runAction = async (action: "en_route" | "on_board" | "completed"): Promise<void> => {
    const btnId =
      action === "en_route" ? "btn-en-route" : action === "on_board" ? "btn-on-board" : "btn-complete";
    const btn = document.getElementById(btnId) as HTMLButtonElement | null;
    if (btn) btn.disabled = true;

    try {
      const bookingId = booking.id;
      if (!bookingId) throw new Error("Missing booking id");

      const res = await fetch("/api/missions/terrain-transition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id: bookingId, action }),
      });
      const data = (await res.json()) as { success?: boolean; notes?: string; error?: string };

      if (data.success) {
        booking.mission_note = data.notes ?? booking.mission_note;
        if (action === "completed") {
          booking.mission_status = "completed";
          window.location.reload();
        } else {
          updateTerrainUI(booking);
        }
      } else {
        alert(data.error || "Erreur");
        updateTerrainUI(booking);
      }
    } catch {
      alert("Erreur réseau");
      updateTerrainUI(booking);
    }
  };

  document.getElementById("btn-en-route")?.addEventListener("click", () => void runAction("en_route"));
  document.getElementById("btn-on-board")?.addEventListener("click", () => void runAction("on_board"));
  document.getElementById("btn-complete")?.addEventListener("click", () => void runAction("completed"));
};

const updateRatingUI = (booking: AnyBooking): void => {
  const section = document.getElementById("modal-rating-section");
  const ratingDisplay = document.getElementById("modal-rating-display");
  const qrSection = document.getElementById("modal-qr-section");
  if (!section || !ratingDisplay || !qrSection) return;

  if (booking.mission_status !== "completed") {
    section.classList.add("hidden");
    return;
  }

  section.classList.remove("hidden");

  if (booking.rating != null) {
    ratingDisplay.classList.remove("hidden");
    qrSection.classList.add("hidden");

    const starsEl = document.getElementById("modal-rating-stars");
    if (starsEl) {
      starsEl.innerHTML = [1, 2, 3, 4, 5]
        .map((s) => `<svg class="w-5 h-5 ${s <= Number(booking.rating) ? "text-amber-400" : "text-slate-700"}" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545-4.756-4.635 6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>`)
        .join("");
    }

    const commentEl = document.getElementById("modal-rating-comment");
    if (commentEl) {
      commentEl.innerText = booking.rating_comment
        ? `"${booking.rating_comment}"`
        : "Aucun commentaire";
    }
  } else {
    ratingDisplay.classList.add("hidden");
    qrSection.classList.remove("hidden");

    const canvas = document.getElementById("modal-qr-canvas") as HTMLCanvasElement | null;
    if (canvas && booking.id) {
      const siteOrigin = (import.meta.env.PUBLIC_SITE_URL as string | undefined)?.replace(/\/$/, "") || window.location.origin;
      const ratingUrl = `${siteOrigin}/rate/${booking.id}`;
      QRCode.toCanvas(canvas, ratingUrl, {
        width: 112,
        margin: 1,
        color: { dark: "#000000", light: "#ffffff" },
      }).catch(console.error);
    }
  }
};

const run = (): void => {
  const openBtn = document.querySelector<HTMLButtonElement>("#open-new-booking");
  const closeBtn = document.querySelector<HTMLButtonElement>("#close-new-booking");
  const modal = document.querySelector<HTMLElement>("#new-booking-modal");
  const overlay = modal?.querySelector<HTMLElement>(".modal-overlay") ?? null;
  const form = document.querySelector<HTMLFormElement>("#new-booking-form");

  const detailModal = document.getElementById("detail-booking-modal");
  const driverId = detailModal?.getAttribute("data-driver-id") ?? null;
  const closeDetailBtns = document.querySelectorAll<HTMLButtonElement>(".close-detail-modal");
  const detailOverlay = detailModal?.querySelector<HTMLElement>(".modal-overlay") ?? null;

  const toggleNewBookingModal = (): void => {
    if (!modal) return;
    const isOpen = modal.style.display === "flex";
    if (isOpen) {
      modal.classList.remove("is-active");
      form?.reset();
      setTimeout(() => { if (!modal.classList.contains("is-active")) modal.style.display = "none"; }, 500);
    } else {
      modal.style.display = "flex";
      requestAnimationFrame(() => modal.classList.add("is-active"));
    }
  };

  const toggleDetailModal = (): void => {
    if (!detailModal) return;
    const isOpen = detailModal.style.display === "flex";
    if (isOpen) {
      detailModal.classList.add("opacity-0");
      detailModal.querySelector(".relative")?.classList.add("scale-95");
      setTimeout(() => { if (detailModal.classList.contains("opacity-0")) detailModal.style.display = "none"; }, 500);
    } else {
      detailModal.style.display = "flex";
      requestAnimationFrame(() => {
        detailModal.classList.remove("opacity-0");
        detailModal.querySelector(".relative")?.classList.remove("scale-95");
      });
    }
  };

  overlay?.addEventListener("click", toggleNewBookingModal);
  openBtn?.addEventListener("click", toggleNewBookingModal);
  closeBtn?.addEventListener("click", toggleNewBookingModal);

  closeDetailBtns.forEach((btn) => btn.addEventListener("click", toggleDetailModal));
  detailOverlay?.addEventListener("click", toggleDetailModal);

  const openDetailForRow = (row: HTMLElement): void => {
      const booking = parseBookingFromRow(row);
      updateTerrainUI(booking);
      updateRatingUI(booking);

      const nameEl = document.getElementById("modal-client-name");
      const phoneLinkEl = document.getElementById("modal-client-phone-link") as HTMLAnchorElement | null;
      const pickupEl = document.getElementById("modal-pickup");
      const dropoffEl = document.getElementById("modal-dropoff");
      const passengersEl = document.getElementById("modal-passengers");
      const luggageEl = document.getElementById("modal-luggage");
      const notesEl = document.getElementById("modal-notes");
      const timeEl = document.getElementById("modal-time");
      const mapLinkEl = document.getElementById("modal-map-link") as HTMLAnchorElement | null;
      const dateEl = document.getElementById("modal-date");
      const amountEl = document.getElementById("modal-amount");
      const refEl = document.getElementById("modal-booking-ref");
      const typeEl = document.getElementById("modal-booking-type");
      const statusEl = document.getElementById("modal-status-badge");

      const STATUS_LABELS_FR: Record<string, string> = {
        to_validate: "À valider",
        not_started: "À venir",
        in_progress: "En cours",
        pending: "En attente",
        accepted: "Confirmée",
        paid: "Payée",
        completed: "Terminée",
        cancelled: "Annulée",
        no_show: "Non présentation",
      };

      const firstName = booking.customers?.first_name ?? "";
      const lastName = booking.customers?.last_name ?? "";
      if (nameEl) nameEl.innerText = `${firstName} ${lastName}`.trim() || "Client";

      if (phoneLinkEl) {
        const phone = booking.customers?.phone;
        if (phone) {
          phoneLinkEl.href = `tel:${phone}`;
          phoneLinkEl.style.display = "flex";
        } else {
          phoneLinkEl.style.display = "none";
        }
      }

      if (pickupEl) pickupEl.innerText = String(booking.pickup_address ?? "");
      if (dropoffEl) dropoffEl.innerText = String(booking.dropoff_address ?? "Non spécifiée");
      if (passengersEl) passengersEl.innerText = String(booking.passenger_count ?? 1);
      if (luggageEl) luggageEl.innerText = String(booking.luggage_count ?? 0);
      if (notesEl) notesEl.innerText = String(booking.mission_note ?? booking.notes ?? "Aucune note particulière.");

      const id = booking.id ?? "---";
      if (refEl) refEl.innerText = `REF: #${String(id).split("-")[0].toUpperCase()}`;

      if (statusEl) {
        const status = String(booking.mission_status ?? booking.status ?? "");
        statusEl.innerText = STATUS_LABELS_FR[status] || status;

        const statusColors: Record<string, string> = {
          to_validate: "bg-amber-500/10 text-amber-500 border-amber-500/20",
          not_started: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
          in_progress: "bg-indigo-600/20 text-indigo-400 border-indigo-500/30",
          completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
          pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
          accepted: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
          paid: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
          cancelled: "bg-rose-500/10 text-rose-500 border-rose-500/20",
        };
        const colorClass = statusColors[status] || "bg-white/10 text-white border-white/10";
        statusEl.className = `px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest text-center ${colorClass}`;

        const acceptBtn = document.getElementById("modal-accept-btn") as HTMLButtonElement | null;
        if (acceptBtn) {
          if (status === "paid" || status === "to_validate") {
            acceptBtn.classList.remove("hidden");
            if (!driverId) {
              acceptBtn.classList.add("opacity-50");
              acceptBtn.onclick = () => alert("Profil chauffeur requis.");
            } else {
              acceptBtn.classList.remove("opacity-50");
              acceptBtn.onclick = async () => {
                try {
                  acceptBtn.innerText = "Traitement...";
                  acceptBtn.disabled = true;

                  const bookingId = booking.id;
                  if (!bookingId) throw new Error("Missing booking id");

                  const { error } = await supabase.functions.invoke("accept-booking", {
                    body: { booking_id: bookingId, driver_id: driverId },
                  });
                  if (error) throw error;
                  window.location.reload();
                } catch {
                  alert("Erreur lors de l'acceptation.");
                  acceptBtn.innerText = "Accepter la course";
                  acceptBtn.disabled = false;
                }
              };
            }
          } else {
            acceptBtn.classList.add("hidden");
          }
        }
      }

      if (amountEl) amountEl.innerText = `${Number(booking.total_amount ?? 0).toFixed(2)}€`;
      if (mapLinkEl) {
        const origin = encodeURIComponent(String(booking.pickup_address ?? ""));
        const destination = encodeURIComponent(String(booking.dropoff_address ?? ""));
        mapLinkEl.href = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
      }

      if (typeEl) {
        const isHourly = (booking.booking_type ?? "") === "hourly";
        typeEl.innerText = isHourly ? "MISE À DISPOSITION" : "TRANSFERT";
        typeEl.className = `px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${
          isHourly
            ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
            : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
        }`;
      }

      const dateObj = booking.pickup_time ? new Date(booking.pickup_time) : null;
      if (dateObj && !Number.isNaN(dateObj.getTime())) {
        if (timeEl) timeEl.innerText = dateObj.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
        if (dateEl) dateEl.innerText = dateObj.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
      } else {
        if (timeEl) timeEl.innerText = "---";
        if (dateEl) dateEl.innerText = "---";
      }

      toggleDetailModal();
  };

  document.querySelectorAll<HTMLElement>(".booking-row").forEach((row) => {
    row.setAttribute("role", "button");
    row.setAttribute("tabindex", "0");
    row.style.touchAction = "manipulation";
    row.style.cursor = "pointer";

    // iOS Safari: click events are unreliable on non-interactive elements inside
    // -webkit-overflow-scrolling containers. Use touchend + scroll detection.
    let touchStartY = 0;
    let touchMoved = false;

    row.addEventListener("touchstart", (e) => {
      touchStartY = e.touches[0].clientY;
      touchMoved = false;
    }, { passive: true });

    row.addEventListener("touchmove", () => {
      touchMoved = true;
    }, { passive: true });

    row.addEventListener("touchend", (e) => {
      if (!touchMoved) {
        e.preventDefault();
        openDetailForRow(row);
      }
    });

    row.addEventListener("click", () => openDetailForRow(row));
  });

  const setupCustomDropdown = (
    btnId: string,
    menuId: string,
    hiddenId: string,
    labelId: string,
    optionClass: string,
    onChange?: (val: string) => void,
  ): void => {
    const btn = document.getElementById(btnId);
    const menu = document.getElementById(menuId);
    const hidden = document.getElementById(hiddenId) as HTMLInputElement | null;
    const label = document.getElementById(labelId);

    btn?.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menu?.classList.contains("opacity-100");

      document
        .querySelectorAll<HTMLElement>("[id$='-custom-menu'], [id$='-dropdown-menu']")
        .forEach((m) => {
          m.classList.remove("opacity-100", "scale-100", "pointer-events-auto");
          m.classList.add("opacity-0", "scale-95", "pointer-events-none");
        });

      if (!isOpen) {
        menu?.classList.remove("opacity-0", "scale-95", "pointer-events-none");
        menu?.classList.add("opacity-100", "scale-100", "pointer-events-auto");
      }
    });

    (menu?.querySelectorAll<HTMLElement>(`.${optionClass}`) ?? []).forEach((opt) => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        const val = opt.dataset.value ?? "";
        const lbl = opt.dataset.label ?? "";
        if (hidden) hidden.value = val;
        if (label) label.textContent = lbl;

        menu?.classList.remove("opacity-100", "scale-100", "pointer-events-auto");
        menu?.classList.add("opacity-0", "scale-95", "pointer-events-none");

        onChange?.(val);
      });
    });
  };

  const updatePriceAndFields = (): void => {
    const formEl = document.getElementById("new-booking-form");
    if (!formEl) return;

    const bookingType = (document.getElementById("booking_type_hidden") as HTMLInputElement | null)?.value || "transfer";
    const fixedRouteId = (document.getElementById("fixed_route_id_hidden") as HTMLInputElement | null)?.value || "";
    const vehicleCategory = (document.getElementById("vehicle_category_hidden") as HTMLInputElement | null)?.value || "";
    const durationHours = Number((document.getElementById("duration_hours") as HTMLInputElement | null)?.value || "1");
    const kmInput = document.getElementById("distance_km") as HTMLInputElement | null;
    const manualTotalInput = document.querySelector<HTMLInputElement>("input[name='manual_total']");
    const pickupInput = document.querySelector<HTMLInputElement>("input[name='pickup']");
    const dropoffInput = document.querySelector<HTMLInputElement>("input[name='dropoff']");

    // --- Forfait fixe ---
    if (fixedRouteId && bookingType !== "hourly") {
      try {
        const fixedRoutes = JSON.parse(formEl.getAttribute("data-fixed-routes") || "[]");
        const route = fixedRoutes.find((r: any) => r.id === fixedRouteId);
        if (route) {
          const matched = fixedRoutes.find((r: any) =>
            r.pickup_zone_id === route.pickup_zone_id &&
            r.dropoff_zone_id === route.dropoff_zone_id &&
            r.vehicle_category.toLowerCase() === vehicleCategory.toLowerCase()
          ) || route;
          if (manualTotalInput) manualTotalInput.value = Number(matched.price).toFixed(2);
          if (pickupInput && !pickupInput.value.trim()) pickupInput.value = `${route.pickup_zone?.name || ""} - `;
          if (dropoffInput && !dropoffInput.value.trim()) dropoffInput.value = `${route.dropoff_zone?.name || ""} - `;
        }
      } catch { /* ignore */ }
      return;
    }

    // --- Tarif dynamique (module partagé) ---
    try {
      const rules = JSON.parse(formEl.getAttribute("data-pricing-rules") || "[]") as PricingRule[];
      const rule = findPricingRule(rules, vehicleCategory);
      if (!rule) return;

      const km = Number(kmInput?.value || 0);

      const madsMode = (document.getElementById("mads_mode_hidden") as HTMLInputElement | null)?.value ?? "";
      // Si hourly et aucun mode sélectionné, on ne calcule pas encore
      if (bookingType === "hourly" && !madsMode) return;

      const effectiveType = bookingType === "hourly"
        ? (madsMode === "km" ? "transfer" : "hourly")
        : "transfer";

      if (effectiveType === "transfer" && km <= 0) return;
      if (effectiveType === "hourly" && durationHours <= 0) return;

      const total = calculatePrice({
        bookingType: effectiveType,
        distanceKm: km,
        durationHours,
        rule,
      });

      if (manualTotalInput) manualTotalInput.value = total.toFixed(2);
    } catch { /* ignore */ }
  };

  const durationHoursInput = document.getElementById("duration_hours");
  durationHoursInput?.addEventListener("input", () => {
    updatePriceAndFields();
  });

  const distanceKmInput = document.getElementById("distance_km");
  distanceKmInput?.addEventListener("input", () => {
    updatePriceAndFields();
  });

  const dropoffInput = document.querySelector<HTMLInputElement>("#dropoff-input");
  setupCustomDropdown(
    "type-custom-btn",
    "type-custom-menu",
    "booking_type_hidden",
    "type-custom-label",
    "custom-option",
    (val) => {
      const durationHoursContainer = document.getElementById("duration-hours-container");
      const forfaitSelectorContainer = document.getElementById("forfait-selector-container");
      const distanceKmContainer = document.getElementById("distance-km-container");
      const madsContainer = document.getElementById("mads-mode-container");

      if (!dropoffInput) return;

      // Reset montant, adresses et km/heures à chaque changement de type
      const pickupInput = document.querySelector<HTMLInputElement>("input[name='pickup']");
      const manualTotalInput = document.querySelector<HTMLInputElement>("input[name='manual_total']");
      const kmInput = document.getElementById("distance_km") as HTMLInputElement | null;
      const hoursInput = document.getElementById("duration_hours") as HTMLInputElement | null;
      if (pickupInput) pickupInput.value = "";
      if (dropoffInput) dropoffInput.value = "";
      if (manualTotalInput) manualTotalInput.value = "";
      if (kmInput) kmInput.value = "";
      if (hoursInput) hoursInput.value = "1";

      if (val === "hourly") {
        dropoffInput.required = false;
        dropoffInput.placeholder = "Adresse de fin (Optionnel)";

        madsContainer?.classList.remove("hidden");
        forfaitSelectorContainer?.classList.add("hidden");

        // Réinitialiser le forfait
        const fixedRouteHidden = document.getElementById("fixed_route_id_hidden") as HTMLInputElement | null;
        if (fixedRouteHidden) fixedRouteHidden.value = "";
        const forfaitLabel = document.getElementById("forfait-custom-label");
        if (forfaitLabel) forfaitLabel.textContent = "Aucun forfait";

        // Afficher km ou heure seulement si un mode a déjà été choisi
        const madsMode = (document.getElementById("mads_mode_hidden") as HTMLInputElement | null)?.value ?? "";
        if (madsMode === "km") {
          distanceKmContainer?.classList.remove("hidden");
          distanceKmContainer?.style.setProperty("display", "flex");
          durationHoursContainer?.classList.add("hidden");
          durationHoursContainer?.style.setProperty("display", "none");
        } else if (madsMode === "hour") {
          distanceKmContainer?.classList.add("hidden");
          distanceKmContainer?.style.setProperty("display", "none");
          durationHoursContainer?.classList.remove("hidden");
          durationHoursContainer?.style.setProperty("display", "flex");
        } else {
          // Aucun mode sélectionné : les deux restent cachés
          distanceKmContainer?.classList.add("hidden");
          durationHoursContainer?.classList.add("hidden");
        }
      } else {
        // Transfert — adresse arrivée obligatoire, pas de km/heures
        dropoffInput.required = true;
        dropoffInput.placeholder = "Adresse d'arrivée";

        madsContainer?.classList.add("hidden");
        durationHoursContainer?.classList.add("hidden");
        durationHoursContainer?.style.setProperty("display", "none");
        distanceKmContainer?.classList.add("hidden");
        distanceKmContainer?.style.setProperty("display", "none");
        forfaitSelectorContainer?.classList.remove("hidden");
      }
      updatePriceAndFields();
    },
  );

  setupCustomDropdown(
    "vehicle-custom-btn",
    "vehicle-custom-menu",
    "vehicle_id_hidden",
    "vehicle-custom-label",
    "custom-option-vehicle",
    (val) => {
      const menu = document.getElementById("vehicle-custom-menu");
      const opt = menu?.querySelector<HTMLElement>(`[data-value='${val}']`);
      const category = opt?.dataset.category || "";
      const categoryHidden = document.getElementById("vehicle_category_hidden") as HTMLInputElement | null;
      if (categoryHidden) {
        categoryHidden.value = category;
      }
      updatePriceAndFields();
    }
  );

  setupCustomDropdown(
    "forfait-custom-btn",
    "forfait-custom-menu",
    "fixed_route_id_hidden",
    "forfait-custom-label",
    "custom-option-forfait",
    (val) => {
      if (val) {
        const kmInput = document.getElementById("distance_km") as HTMLInputElement | null;
        if (kmInput) kmInput.value = "";
      }
      // km field stays hidden for transfer — price comes from forfait or manual entry
      updatePriceAndFields();
    }
  );

  // Sous-dropdown mise à dispo : km ↔ heure
  setupCustomDropdown(
    "mads-mode-btn",
    "mads-mode-menu",
    "mads_mode_hidden",
    "mads-mode-label",
    "custom-option-mads",
    (val) => {
      const durationHoursContainer = document.getElementById("duration-hours-container");
      const distanceKmContainer = document.getElementById("distance-km-container");
      if (val === "km") {
        distanceKmContainer?.classList.remove("hidden");
        distanceKmContainer?.style.setProperty("display", "flex");
        durationHoursContainer?.classList.add("hidden");
        durationHoursContainer?.style.setProperty("display", "none");
      } else {
        distanceKmContainer?.classList.add("hidden");
        distanceKmContainer?.style.setProperty("display", "none");
        durationHoursContainer?.classList.remove("hidden");
        durationHoursContainer?.style.setProperty("display", "flex");
      }
      updatePriceAndFields();
    },
  );

  setupCustomDropdown("payment-custom-btn", "payment-custom-menu", "payment_mode_hidden", "payment-custom-label", "custom-option-payment");

  const setupHeaderDropdown = (btnId: string, menuId: string): void => {
    const btn = document.getElementById(btnId);
    const menu = document.getElementById(menuId);
    btn?.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menu?.classList.contains("opacity-100");
      document
        .querySelectorAll<HTMLElement>("[id$='-custom-menu'], [id$='-dropdown-menu']")
        .forEach((m) => {
          m.classList.remove("opacity-100", "scale-100", "pointer-events-auto");
          m.classList.add("opacity-0", "scale-95", "pointer-events-none");
        });
      if (!isOpen) {
        menu?.classList.remove("opacity-0", "scale-95", "pointer-events-none");
        menu?.classList.add("opacity-100", "scale-100", "pointer-events-auto");
      }
    });
  };

  setupHeaderDropdown("status-dropdown-button", "status-dropdown-menu");
  setupHeaderDropdown("type-dropdown-button", "type-dropdown-menu");

  window.addEventListener("click", () => {
    document.querySelectorAll<HTMLElement>("[id$='-custom-menu'], [id$='-dropdown-menu']").forEach((m) => {
      m.classList.remove("opacity-100", "scale-100", "pointer-events-auto");
      m.classList.add("opacity-0", "scale-95", "pointer-events-none");
    });
  });


  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector<HTMLButtonElement>("button[type='submit']");
    const originalText = submitBtn?.textContent ?? "";

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Création en cours...";
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      manual_total: data.manual_total,
    };

    try {
      const res = await fetch("/api/tenant/create-booking", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const result = (await res.json()) as { success?: boolean; error?: string };
      if (result.success) {
        alert("Réservation créée avec succès !");
        window.location.href = "/app/bookings";
      } else {
        alert(`Erreur: ${result.error || "Inconnue"}`);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    } catch {
      alert("Erreur réseau ou crash serveur");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (modal?.style.display === "flex") toggleNewBookingModal();
    if (detailModal?.style.display === "flex") toggleDetailModal();
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", run);
} else {
  run();
}

