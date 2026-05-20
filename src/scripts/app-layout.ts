import { supabase } from "@/lib/supabase/client";

const run = (): void => {
  const logoutBtn = document.querySelector<HTMLButtonElement>("#logout-btn");
  const modal = document.querySelector<HTMLElement>("#logout-modal");
  const confirmBtn = document.querySelector<HTMLButtonElement>("#confirm-logout");
  const cancelBtn = document.querySelector<HTMLButtonElement>("#cancel-logout");
  const overlay = document.querySelector<HTMLElement>("#logout-modal .modal-overlay");

  const toggleModal = (): void => {
    modal?.classList.toggle("is-active");
    document.body.classList.toggle("overflow-hidden");
  };

  logoutBtn?.addEventListener("click", toggleModal);
  cancelBtn?.addEventListener("click", toggleModal);
  overlay?.addEventListener("click", toggleModal);

  confirmBtn?.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  });

  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (modal?.classList.contains("is-active")) toggleModal();
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", run);
} else {
  run();
}
