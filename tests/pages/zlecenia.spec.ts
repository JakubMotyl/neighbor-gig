import { test, expect } from "@playwright/test";

test.describe("Zlecenia Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:3000/zlecenia");
    });

    test("should render zlecenia search and initial listing elements", async ({
        page,
    }) => {
        // Verify search bar input and category selector button
        await expect(page.getByPlaceholder("Czego szukasz?")).toBeVisible();
        await expect(
            page.getByRole("button", { name: "Wszystkie kategorie" }),
        ).toBeVisible();
        await expect(
            page.getByRole("button", { name: "Szukaj", exact: true }),
        ).toBeVisible();

        // Verify sorting tab navigation
        await expect(
            page.getByRole("button", { name: "Najnowsze" }),
        ).toBeVisible();
        await expect(
            page.getByRole("button", { name: "Najwyższa ocena" }),
        ).toBeVisible();
        await expect(
            page.getByRole("button", { name: "Zweryfikowani" }),
        ).toBeVisible();
    });

    test("should submit search keyword and update URL query params", async ({
        page,
    }) => {
        const searchInput = page.getByPlaceholder("Czego szukasz?");
        await searchInput.fill("malowanie");
        await page.getByRole("button", { name: "Szukaj", exact: true }).click();

        await expect(page).toHaveURL(/\/zlecenia\?.*keyword=malowanie/);
    });

    test("should filter zlecenia by selecting category from dropdown", async ({
        page,
    }) => {
        // Open category filter dropdown
        const categoryDropdownBtn = page.getByRole("button", {
            name: "Wszystkie kategorie",
        });
        await categoryDropdownBtn.click();

        // Select specific category (e.g. Ogród)
        const categoryOption = page
            .locator("form div")
            .getByRole("button", { name: /ogród/i });

        await expect(categoryOption).toBeVisible();
        await categoryOption.click();

        // Submit search form
        await page.getByRole("button", { name: "Szukaj", exact: true }).click();

        await expect(page).toHaveURL(/\/zlecenia\?category=ogrod/);
    });

    test("should update query params when changing sort tabs", async ({
        page,
    }) => {
        const ratignSortBtn = page.getByRole("button", {
            name: "Najwyższa ocena",
        });
        await ratignSortBtn.click();
        await expect(page).toHaveURL(/\/zlecenia\?sort=rating/);

        const verifiedSortBtn = page.getByRole("button", {
            name: "Zweryfikowani",
        });
        await verifiedSortBtn.click();
        await expect(page).toHaveURL(/\/zlecenia\?sort=verified/);
    });
    test("should navigate to gig details and open application modal", async ({
        page,
    }) => {
        // Find available zlecenia cards rendered by React Query
        const gigCard = page.locator("article[role='link']").first();

        // If tasks are present in the test database, verify navigation flow
        if (await gigCard.isVisible()) {
            await gigCard.click();

            // Assert redirection to slug details URL
            await expect(page).toHaveURL(/\/zlecenia\/[a-z0-9-]+/);

            // Assert details headers and return button
            await expect(
                page.getByRole("link", { name: /wróć do listy zleceń/i }),
            ).toBeVisible();
            await expect(
                page.getByRole("heading", { name: "Opis zadania" }),
            ).toBeVisible();

            // Verify action card presence
            const applyButton = page.getByRole("button", {
                name: "Zgłoś do zadania",
            });

            if (await applyButton.isVisible()) {
                await applyButton.click();

                // Assert modal dialog and form inputs
                await expect(
                    page.getByRole("heading", { name: "Złóż ofertę" }),
                ).toBeVisible();
                await expect(
                    page.getByLabel("Proponowana kwota"),
                ).toBeVisible();
                await expect(
                    page.getByLabel(/Wiadomość dla zlecającego/),
                ).toBeVisible();

                // Close modal
                await page.getByLabel("Zamknij modal").click();
                await expect(
                    page.getByRole("heading", { name: "Złóż ofertę" }),
                ).toBeHidden();
            }
        }
    });
});
