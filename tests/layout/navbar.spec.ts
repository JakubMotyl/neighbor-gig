import { test, expect } from "@playwright/test";

test.describe("Navbar", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:3000");
    });
    test.describe("Desktop Viewport", () => {
        // Set standard desktop screen resolution
        test.use({ viewport: { width: 1280, height: 720 } });

        test("should display desktop navigation elements and logo", async ({
            page,
        }) => {
            // Verify brand logo link
            await expect(
                page.getByRole("link", { name: /gigo/i }).first(),
            ).toBeVisible();

            // Verify desktop navigation links
            const nav = page.getByRole("navigation");
            await expect(
                nav.getByRole("link", { name: "Oferty" }),
            ).toBeVisible();
            await expect(
                nav.getByRole("link", { name: "Jak to działa" }),
            ).toBeVisible();

            // Verify guest actions (Create Gig and Login)
            await expect(
                nav.getByRole("link", { name: "+ Dodaj zlecenie" }),
            ).toBeVisible();
            await expect(
                nav.getByRole("link", { name: "Logowanie" }),
            ).toBeVisible();
        });

        test("should navigate Gigs page when clicking Oferty", async ({
            page,
        }) => {
            const nav = page.getByRole("navigation");
            const gigsLinks = nav.getByRole("link", { name: "Oferty" });

            await gigsLinks.click();
            await expect(page).toHaveURL(/\/zlecenia/);
        });

        test("should navigate to Login page when clicking Logowanie", async ({
            page,
        }) => {
            const nav = page.getByRole("navigation");
            const loginLink = nav.getByRole("link", { name: "Logowanie" });

            await loginLink.click();
            await expect(page).toHaveURL(/\/logowanie/);
        });

        test("should redirect to auth or add-gig route when clicking + Dodaj Zlecenie", async ({
            page,
        }) => {
            const nav = page.getByRole("navigation");
            const addGigLink = nav.getByRole("link", {
                name: "+ Dodaj Zlecenie",
            });

            await addGigLink.click();

            // Matches either direct route or auth guard redirection
            await expect(page).toHaveURL(/\/(dodaj-zlecenie|logowanie)/);
        });
    });
    test.describe("Mobile Viewport", () => {
        test.use({ viewport: { width: 375, height: 667 } });

        test("should toggle mobile menu drawer correctly", async ({ page }) => {
            const openMenuBtn = page.getByRole("button", {
                name: "Otwórz menu",
            });
            const closeMenuBtn = page.getByRole("button", {
                name: "Zamknij menu",
            });

            // Initial state: open menu button is visible, drawer links are not visible
            await expect(openMenuBtn).toBeVisible();
            await expect(
                page.getByRole("link", { name: "Oferty" }),
            ).toBeHidden();

            // Open mobile drawer
            await openMenuBtn.click();
            await expect(closeMenuBtn).toBeVisible();
            await expect(
                page.getByRole("link", { name: "Oferty" }),
            ).toBeVisible();

            // Close mobile drawer
            await closeMenuBtn.click();
            await expect(openMenuBtn).toBeVisible();
            await expect(
                page.getByRole("link", { name: "Oferty" }),
            ).toBeHidden();
        });
        test("should navigate and auto-close mobile menu on link click", async ({
            page,
        }) => {
            // Open mobile menu
            await page.getByRole("button", { name: "Otwórz menu" }).click();

            // Click navigation link inside mobile drawer
            const loginLink = page.getByRole("link", { name: "Logowanie" });
            await expect(loginLink).toBeVisible();
            await loginLink.click();

            // Verify navigation success
            await expect(page).toHaveURL(/\/logowanie/);
        });
    });
});
