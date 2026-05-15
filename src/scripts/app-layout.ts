import { supabase } from "@/lib/supabase/client";

const run = (): void => {
  const logoutBtn = document.querySelector<HTMLButtonElement>("#logout-btn");
  const modal = document.querySelector<HTMLElement>("#logout-modal");
  const confirmBtn = document.querySelector<HTMLButtonElement>("#confirm-logout");
  const cancelBtn = document.querySelector<HTMLButtonElement>("#cancel-logout");
  const overlay = document.querySelector<HTMLElement>("#logout-modal .modal-overlay");

  const mobileMenu = document.querySelector<HTMLElement>("#mobile-menu");
  const mobileMenuBtn =
    document.querySelector<HTMLButtonElement>("#mobile-menu-toggle");
  const mobileMenuClose =
    document.querySelector<HTMLButtonElement>("#mobile-menu-close");
  const mobileMenuOverlay = document.querySelector<HTMLElement>(
    "#mobile-menu .mobile-menu-overlay",
  );
  const logoutBtnMobile =
    document.querySelector<HTMLButtonElement>("#logout-btn-mobile");

  const toggleModal = (): void => {
    modal?.classList.toggle("is-active");
    document.body.classList.toggle("overflow-hidden");
  };

  const toggleMobileMenu = (): void => {
    mobileMenu?.classList.toggle("is-active");
    document.body.classList.toggle("overflow-hidden");
  };

  logoutBtn?.addEventListener("click", toggleModal);
  cancelBtn?.addEventListener("click", toggleModal);
  overlay?.addEventListener("click", toggleModal);

  confirmBtn?.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  });

  mobileMenuBtn?.addEventListener("click", toggleMobileMenu);
  mobileMenuClose?.addEventListener("click", toggleMobileMenu);
  mobileMenuOverlay?.addEventListener("click", toggleMobileMenu);

  logoutBtnMobile?.addEventListener("click", () => {
    toggleMobileMenu();
    toggleModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (modal?.classList.contains("is-active")) toggleModal();
    if (mobileMenu?.classList.contains("is-active")) toggleMobileMenu();
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", run);
} else {
  run();
}
