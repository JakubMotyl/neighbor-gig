import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:3000/logowanie");
    });

    test("should render login form elements and social auth", async ({
        page,
    }) => {
        // Assert page header and descriptive subtext
        await expect(
            page.getByRole("heading", { name: "Witaj z powrotem" }),
        ).toBeVisible();
        await expect(
            page.getByText("Zaloguj się do swojego konta w Gigger"),
        ).toBeVisible();

        // Assert Google OAuth button
        await expect(
            page.getByRole("button", { name: "Zaloguj się przez Google" }),
        ).toBeVisible();

        // Assert form inputs and primary submit button
        await expect(page.getByLabel("Adres e-mail")).toBeVisible();
        await expect(page.getByLabel("Hasło", { exact: true })).toBeVisible();
        await expect(
            page.getByRole("button", { name: "Zaloguj się", exact: true }),
        ).toBeVisible();
    });

    test("should toggle password visibility on show/hide icon click", async ({
        page,
    }) => {
        const passwordInput = page.getByLabel("Hasło", { exact: true });
        const toggleBtn = page.getByRole("button", { name: "Pokaż hasło" });

        // Initial state should mask credentials
        await expect(passwordInput).toHaveAttribute("type", "password");

        // Toggle to reveal plain text password
        await toggleBtn.click();
        await expect(passwordInput).toHaveAttribute("type", "text");
        await expect(
            page.getByRole("button", { name: "Ukryj hasło" }),
        ).toBeVisible();

        // Toggle back to masked password
        await page.getByRole("button", { name: "Ukryj hasło" }).click();
        await expect(passwordInput).toHaveAttribute("type", "password");
    });

    test("should enforce required attribute validation on empty inputs", async ({
        page,
    }) => {
        const emailInput = page.getByLabel("Adres e-mail");
        const passwordInput = page.getByLabel("Hasło", { exact: true });

        // Assert HTML5 validation constraints
        await expect(emailInput).toHaveAttribute("required", "");
        await expect(passwordInput).toHaveAttribute("required", "");
    });

    test("should navigate to registration page when clicking register link", async ({
        page,
    }) => {
        const registerLink = page.getByRole("link", {
            name: "Zarejestruj się",
        });

        await registerLink.click();
        await expect(page).toHaveURL(/\/rejestracja/);
    });

    test("should navigate to forgot password page when clicking reminder link", async ({
        page,
    }) => {
        const forgotPasswordLink = page.getByRole("link", {
            name: "Nie pamiętasz hasła?",
        });

        await forgotPasswordLink.click();
        await expect(page).toHaveURL(/\/przypomnij-haslo/);
    });

    test("should display error toast feedback when redirected with error query param", async ({
        page,
    }) => {
        // Navigate with recognized error parameter
        await page.goto(
            "http://localhost:3000/logowanie?error=InvalidCredentials",
        );

        const toast = page
            .getByRole("alert")
            .filter({ hasText: "Błąd logowania" });

        await expect(toast).toBeVisible();
        await expect(
            toast.getByText("Nieprawidłowy adres e-mail lub hasło."),
        ).toBeVisible();
    });
});
