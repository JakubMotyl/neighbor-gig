import z from "zod";

const schema = z.object({
    email: z
        .email("Niepoprawny format adresu e-mail")
        .max(255, "Adres e-mail jest za długi"),

    password: z
        .string()
        .min(8, "Hasło musi mieć minimum 6 znaków")
        .regex(/[A-Z]/, "Hasło musi zawierać co najmniej jedną wielką literę")
        .regex(/\d/, "Hasło musi zawierać co najmniej jedną cyfrę")
        .regex(
            /[^A-Za-z0-9]/,
            "Hasło musi zawierać co najmniej jeden znak specjalny",
        )
        .max(72, "Hasło jest za długie"),
});

const createTaskSchema = z.object({
    title: z
        .string()
        .min(5, "Tytuł musi mieć co najmniej 5 znaków")
        .max(40, "Tytuł jest za długi"),

    description: z
        .string()
        .min(20, "Opis musi mieć co najmniej 20 znaków")
        .max(200, "Opis może mieć maksymalnie 200 znaków"),

    price: z.coerce
        .number({ message: "Cena musi być liczbą" })
        .positive("Cena musi być większa od 0")
        .max(100000, "Cena nie może przekraczać 100 000 PLN"),

    location: z
        .string()
        .min(2, "Podaj poprawną lokalizację")
        .max(30, "Lokalizacja jest za długa"),

    categorySlug: z
        .string()
        .min(1, "Wybierz kategorię")
        .max(50, "Błędna kategoria"),
    executionTime: z.enum([
        "ASAP",
        "WITHIN_FEW_DAYS",
        "THIS_WEEKEND",
        "FLEXIBLE",
    ]),
});

const editProfileSchema = z.object({
    name: z
        .string()
        .min(2, "Imię musi mieć przynajmniej 2 znaki")
        .max(50, "Imię jest za długie"),
    dateOfBirth: z.coerce
        .date({ message: "Nieprawidłowa data" })
        .refine((date) => {
            const minAgeDate = new Date();
            minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);

            return date <= minAgeDate;
        }, "Musisz mieć ukończone 18 lat")
        .optional(),
    location: z.string().max(30, "Lokalizacja jest za długa").optional(),
    bio: z
        .string()
        .max(200, "Opis może mieć maksymalnie 200 znaków")
        .optional(),
});

const offerSchema = z.object({
    taskId: z
        .string({ error: "Brak identyfikatora zlecenia" })
        .min(1, "Błąd zlecenia"),
    price: z.coerce
        .number({ message: "Nieprawidłowa liczba" })
        .min(1, "Kwota musi wynosić przynajmniej 1 PLN")
        .max(100000, "Maksymalna kwota to 100 000 PLN"),
    message: z
        .string()
        .min(10, "Wiadomość powinna mieć przynajmniej 10 znaków")
        .max(200, "Wiadomość powinna mieć maksymalnie 200 znaków"),
});

const forgotPasswordSchema = z.object({
    email: z
        .email({ error: "Nieprawidłowy adres e-mail." })
        .max(255, "Adres e-mail jest za długi"),
});

const resetPasswordSchema = z.object({
    password: z
        .string({ error: "Niepoprawne hasło" })
        .min(6, "Hasło musi mieć minimum 6 znaków")
        .max(72, "Hasło jest za długie"),
    token: z.string(),
});

export {
    schema,
    createTaskSchema,
    editProfileSchema,
    offerSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
};
