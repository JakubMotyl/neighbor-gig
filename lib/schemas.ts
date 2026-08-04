import z from "zod";

const schema = z.object({
    email: z.email("Niepoprawny format adresu e-mail"),
    password: z.string().min(6, "Hasło musi mieć minimum 6 znaków"),
});

const createTaskSchema = z.object({
    title: z
        .string()
        .min(5, "Tytuł musi mieć co najmniej 5 znaków")
        .max(100, "Tytuł jest za długi"),
    description: z.string().min(20, "Opis musi mieć co najmniej 20 znaków"),
    price: z.coerce
        .number({ message: "Cena musi być liczbą" })
        .positive("Cena musi być większa od 0"),
    location: z.string().min(2, "Podaj poprawną lokalizację"),
    categorySlug: z.string().min(1, "Wybierz kategorię"),
});

export { schema, createTaskSchema };
