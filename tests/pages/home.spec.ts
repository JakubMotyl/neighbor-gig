import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:3000");
    });

    test("should have correct metadata and elements", async ({ page }) => {
        await expect(page).toHaveTitle("Gigo | Szybka pomoc w twojej okolicy");

        await expect(
            page.getByRole("heading", {
                name: "Zleć to komuś z okolicy. Odzyskaj swój czas.",
            }),
        ).toBeVisible();

        await expect(
            page.getByText(/Lokalna platforma drobnych usług/i),
        ).toBeVisible();

        await expect(
            page.getByRole("button", {
                name: "Znajdź pomoc",
            }),
        ).toBeVisible();
    });

    test("should throw an error when input is empty", async ({ page }) => {
        // Trigger submit with empty search query
        await page
            .getByRole("button", {
                name: "Znajdź pomoc",
            })
            .click();

        await expect(
            page.getByText("Wpisz, z czym potrzebujesz pomocy."),
        ).toBeVisible();
    });

    test("should throw an error when wrong category is provided", async ({
        page,
    }) => {
        const heroInput = page.getByRole("searchbox", {
            name: "Wyszukaj usługę",
        });

        // Submit invalid category name
        await heroInput.fill("nieistniejaca-kategoria-xyz");
        await page
            .getByRole("button", {
                name: "Znajdź pomoc",
            })
            .click();

        await expect(
            page.getByText(
                "Błędna kategoria. Wybierz sugestię z listy lub „Inne zadania”.",
            ),
        ).toBeVisible();
    });

    test("should redirect when category is selected from autocomplete dropdown", async ({
        page,
    }) => {
        const heroInput = page.getByRole("searchbox", {
            name: "Wyszukaj usługę",
        });

        await heroInput.fill("Ogród");

        // Select matched option from dropdown suggestions
        const dropdownOption = page
            .locator("ul")
            .getByRole("button", { name: /ogród/i });

        await expect(dropdownOption).toBeVisible();
        await dropdownOption.click();

        // Assert client-side navigation with query param
        await expect(page).toHaveURL(/\/zlecenia\?category=/);
    });

    test("should redirect when correct category is provided directly", async ({
        page,
    }) => {
        const heroInput = page.getByRole("searchbox", {
            name: "Wyszukaj usługę",
        });

        // Submit exact category match via primary action button
        await heroInput.fill("Ogród");

        await page
            .getByRole("button", {
                name: "Znajdź pomoc",
            })
            .click();

        await expect(page).toHaveURL(/\/zlecenia\?category=/);
    });
});
