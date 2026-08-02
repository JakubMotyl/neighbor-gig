import z from "zod";

const schema = z.object({
    email: z.email("Niepoprawny format adresu e-mail"),
    password: z.string().min(6, "Hasło musi mieć minimum 6 znaków"),
});

export { schema };
