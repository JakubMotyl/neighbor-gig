export interface GigTask {
    id: string;
    title: string;
    description: string;
    categorySlug: string;
    location: string;
    price: number;
    createdAt: Date;
    isBoosted: boolean;
    authorName: string;
    authorAvatar: string;
    authorVerified: boolean;
    authorRating: number;
}

export const MOCK_TASKS: GigTask[] = [
    {
        id: "task-1",
        title: "Składanie szafy PAX (3 moduły) z lustrem",
        description:
            "Szukam sprawnego fachowca do złożenia szafy PAX z IKEA. Trzy moduły, w tym jedne drzwi lustrzane. Wszystkie paczki są już w mieszkaniu na 2. piętrze (jest winda). Narzędzia własne wymagane. Zależy mi na precyzji, żeby drzwi przsuwne chodziły idealnie gładko.",
        categorySlug: "montaz-i-naprawy",
        location: "Warszawa, Mokotów",
        price: 350,
        createdAt: new Date("2026-05-26T15:30:00Z"),
        isBoosted: true, // Promowane przez Gig-Boost!
        authorName: "Mariusz W.",
        authorAvatar: "https://i.pravatar.cc/150?img=11",
        authorVerified: true, // Zweryfikowany przez Stripe!
        authorRating: 4.9,
    },
    {
        id: "task-2",
        title: "Dokładne sprzątanie mieszkania 55m² po remoncie",
        description:
            "Potrzebuję pomocy w doprowadzeniu mieszkania do porządku po malowaniu i cyklinowaniu podłóg. Do umycia są 4 okna, kurze w szafkach kuchennych oraz dokładne odkurzenie i zmycie pyłu budowlanego z podłóg i listew. Środki czystości zapewniam na miejscu.",
        categorySlug: "sprzatanie",
        location: "Warszawa, Ursynów",
        price: 280,
        createdAt: new Date("2026-05-26T14:15:00Z"),
        isBoosted: false,
        authorName: "Anna Kowalska",
        authorAvatar: "https://i.pravatar.cc/150?img=26",
        authorVerified: true,
        authorRating: 5.0,
    },
    {
        id: "task-3",
        title: "Przewóz kanapy narożnej i wniesienie na 3. piętro",
        description:
            "Zlecenie polega na odebraniu kanapy narożnej ze sklepu meblowego na Targówku i przewiezieniu jej na Wolę. Na miejscu przeznaczenia wymagane jest wniesienie na 3. piętro (brak windy, klatka schodowa jest szeroka). Potrzebne 2 osoby, kanapa składa się z dwóch części.",
        categorySlug: "transport",
        location: "Warszawa, Wola",
        price: 200,
        createdAt: new Date("2026-05-25T09:00:00Z"),
        isBoosted: true,
        authorName: "Piotr S.",
        authorAvatar: "https://i.pravatar.cc/150?img=12",
        authorVerified: false,
        authorRating: 4.5,
    },
    {
        id: "task-4",
        title: "Wyprowadzanie Labradora (3 razy dziennie, weekend)",
        description:
            "Szukam odpowiedzialnego miłośnika psów do opieki nad rocznym labradorem w nadchodzący weekend (sobota i niedziela). Pies jest bardzo energiczny, ale łagodny i usłuchany. Spacery po ok. 45 minut w okolicach Parku Szczęśliwickiego. Najlepiej ktoś z sąsiedztwa.",
        categorySlug: "zwierzeta",
        location: "Warszawa, Ochota",
        price: 150,
        createdAt: new Date("2026-05-25T18:20:00Z"),
        isBoosted: false,
        authorName: "Magda M.",
        authorAvatar: "https://i.pravatar.cc/150?img=47",
        authorVerified: true,
        authorRating: 4.8,
    },
    {
        id: "task-5",
        title: "Skoszenie trawnika 400m² i przycięcie żywopłotu",
        description:
            "Zlecę uporządkowanie przydomowego ogródka. Do skoszenia jest około 400m² trawy oraz równe przycięcie żywopłotu z tui (ok. 15 metrów bieżących, wysokość 2m). Posiadam kosiarkę spalinową i nożyce elektryczne, ale można przyjść ze swoim sprzętem.",
        categorySlug: "ogrod",
        location: "Warszawa, Wilanów",
        price: 250,
        createdAt: new Date("2026-05-24T11:05:00Z"),
        isBoosted: false,
        authorName: "Janusz G.",
        authorAvatar: "https://i.pravatar.cc/150?img=68",
        authorVerified: true,
        authorRating: 4.2,
    },
    {
        id: "task-6",
        title: "Zrobienie i dostarczenie ciężkich zakupów (Castorama)",
        description:
            "Potrzebuję kogoś, kto pojedzie do Castoramy, zakupi 4 worki ziemi ogrodowej (po 50l) oraz korę dekoracyjną (3 worki) i dostarczy mi je pod drzwi domu jednorodzinnego. Prześlę dokładną listę produktów. Zwracam koszt zakupów na podstawie paragonu + kwota zlecenia.",
        categorySlug: "zakupy",
        location: "Warszawa, Wawer",
        price: 90,
        createdAt: new Date("2026-05-26T16:45:00Z"),
        isBoosted: true,
        authorName: "Helena Rucińska",
        authorAvatar: "https://i.pravatar.cc/150?img=5",
        authorVerified: false,
        authorRating: 4.7,
    },
    {
        id: "task-7",
        title: "Naprawa cieknącego spłuczki podtynkowej Geberit",
        description:
            "Woda cały czas delikatnie sączy się do muszli klozetowej w instalacji podtynkowej Geberit. Prawdopodobnie uszczelka zaworu spustowego jest do wymiany lub mechanizm się zawiesił. Szukam kogoś, kto ma doświadczenie z systemami podtynkowymi.",
        categorySlug: "montaz-i-naprawy",
        location: "Warszawa, Śródmieście",
        price: 180,
        createdAt: new Date("2026-05-26T17:00:00Z"),
        isBoosted: false,
        authorName: "Krzysztof Ł.",
        authorAvatar: "https://i.pravatar.cc/150?img=33",
        authorVerified: true,
        authorRating: 4.6,
    },
    {
        id: "task-8",
        title: "Mycie witryn sklepowych (lokal użytkowy, parter)",
        description:
            "Zlecę umycie dużych przeszklonych witryn w salonie fryzjerskim od ulicy. Łącznie 4 duże szyby od ziemi do wysokości 2.5m, mycie z dwóch stron. Interesuje mnie wykonanie zlecenia rano, przed otwarciem salonu (czyli przed godziną 8:00).",
        categorySlug: "sprzatanie",
        location: "Warszawa, Bemowo",
        price: 120,
        createdAt: new Date("2026-05-23T14:00:00Z"),
        isBoosted: false,
        authorName: "Karolina Nowak",
        authorAvatar: "https://i.pravatar.cc/150?img=43",
        authorVerified: true,
        authorRating: 4.9,
    },
    {
        id: "task-9",
        title: "Przeprowadzka kawalerki – przewóz kartonów i AGD",
        description:
            "Szukam osoby z autem dostawczym (typu bus) do pomocy przy przeprowadzce. Do przewiezienia około 15 zabezpieczonych kartonów z rzeczami osobistymi, mikrofalówka, mała lodówka turystyczna oraz materac 140x200. Pomagam przy załadunku i rozładunku.",
        categorySlug: "transport",
        location: "Warszawa, Praga-Południe",
        price: 220,
        createdAt: new Date("2026-05-24T08:30:00Z"),
        isBoosted: false,
        authorName: "Tomasz B.",
        authorAvatar: "https://i.pravatar.cc/150?img=59",
        authorVerified: false,
        authorRating: 4.4,
    },
    {
        id: "task-10",
        title: "Wniesienie starej kanapy do kontenera gabarytowego",
        description:
            "Potrzebuję silnego sąsiada do zniesienia starej, zużytej kanapy dwuosobowej z 4. piętra (brak windy) na dół pod blok, gdzie stoi podstawiony kontener na odpady wielkogabarytowe. Sam nie dam rady tego udźwignąć. Praca na maksymalnie 15-20 minut.",
        categorySlug: "inne", // Kategoria "Inne zadania"
        location: "Warszawa, Żoliborz",
        price: 70,
        createdAt: new Date("2026-05-26T12:00:00Z"),
        isBoosted: false,
        authorName: "Wojciech S.",
        authorAvatar: "https://i.pravatar.cc/150?img=91",
        authorVerified: true,
        authorRating: 4.1,
    },
];
