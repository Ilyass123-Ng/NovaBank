import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TransactionType = "deposit" | "withdraw" | "transfer";
export type TransactionCategory =
  | "salary"
  | "freelance"
  | "groceries"
  | "bills"
  | "leisure"
  | "shopping"
  | "transfer"
  | "other";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  title: string;
  category: TransactionCategory;
  note?: string;
  recipient?: string;
  timestamp: number;
  status: "completed" | "pending";
}

export interface Beneficiary {
  id: string;
  name: string;
  bank: string;
  rib: string;
  avatarBg: string;
}

export interface CardDetails {
  holder: string;
  number: string;
  expiry: string;
  cvv: string;
  isFrozen: boolean;
  type: string;
}

export interface CompteState {
  solde: number;
  currency: "MAD" | "EUR" | "USD";
  card: CardDetails;
  beneficiaries: Beneficiary[];
  transactions: Transaction[];
  error: string | null;
  notification: { message: string; type: "success" | "error" | "info" } | null;
}

const initialTransactions: Transaction[] = [
  {
    id: "tx-1",
    type: "deposit",
    amount: 14500,
    title: "Virement Salaire MENA Tech",
    category: "salary",
    note: "Virement mensuel entreprise",
    timestamp: Date.now() - 1000 * 60 * 60 * 18,
    status: "completed",
  },
  {
    id: "tx-2",
    type: "deposit",
    amount: 6200,
    title: "Projet Freelance UI/UX",
    category: "freelance",
    note: "Paiement client e-commerce",
    recipient: "Cabinet FinDesign",
    timestamp: Date.now() - 1000 * 60 * 60 * 42,
    status: "completed",
  },
  {
    id: "tx-3",
    type: "withdraw",
    amount: 850,
    title: "Supermarché Marjane Market",
    category: "groceries",
    note: "Courses hebdomadaires",
    timestamp: Date.now() - 1000 * 60 * 60 * 65,
    status: "completed",
  },
  {
    id: "tx-4",
    type: "transfer",
    amount: 1200,
    title: "Virement à Fatima Z.",
    category: "transfer",
    recipient: "Fatima Zahra E.",
    note: "Remboursement avance voyage",
    timestamp: Date.now() - 1000 * 60 * 60 * 90,
    status: "completed",
  },
  {
    id: "tx-5",
    type: "withdraw",
    amount: 450,
    title: "Abonnement Fibre & Mobile IAM",
    category: "bills",
    note: "Facture Internet Haut Débit",
    timestamp: Date.now() - 1000 * 60 * 60 * 120,
    status: "completed",
  },
];

const initialBeneficiaries: Beneficiary[] = [
  {
    id: "ben-1",
    name: "Fatima-Zahra El Amrani",
    bank: "Attijariwafa Bank",
    rib: "007 780 0001234567890123 45",
    avatarBg: "from-pink-500 to-rose-600",
  },
  {
    id: "ben-2",
    name: "Yassine Benali",
    bank: "Banque Populaire",
    rib: "125 810 0009876543210987 12",
    avatarBg: "from-indigo-500 to-blue-600",
  },
  {
    id: "ben-3",
    name: "Mehdi Kabbaj",
    bank: "CIH Bank",
    rib: "230 780 0004561237890123 88",
    avatarBg: "from-emerald-500 to-teal-600",
  },
  {
    id: "ben-4",
    name: "Sarah Tazi",
    bank: "Bank of Africa (BMCE)",
    rib: "011 810 0006549873216549 90",
    avatarBg: "from-amber-500 to-orange-600",
  },
];

const initialState: CompteState = {
  solde: 18200,
  currency: "MAD",
  card: {
    holder: "ILYAS ENNAJY",
    number: "4234 •••• •••• 8892",
    expiry: "09/29",
    cvv: "742",
    isFrozen: false,
    type: "Visa Infinite Black",
  },
  beneficiaries: initialBeneficiaries,
  transactions: initialTransactions,
  error: null,
  notification: null,
};

export const compteSlice = createSlice({
  name: "compte",
  initialState,
  reducers: {
    deposit(
      state,
      action: PayloadAction<{
        amount: number;
        category?: TransactionCategory;
        title?: string;
        note?: string;
      } | number>
    ) {
      const payload =
        typeof action.payload === "number"
          ? { amount: action.payload, category: "other" as TransactionCategory, title: "Dépôt sur compte", note: "" }
          : action.payload;

      if (payload.amount <= 0 || isNaN(payload.amount)) {
        state.error = "Veuillez saisir un montant valide supérieur à 0.";
        return;
      }

      state.solde += payload.amount;
      state.transactions.unshift({
        id: `tx-${Date.now()}`,
        type: "deposit",
        amount: payload.amount,
        title: payload.title || "Dépôt d'argent",
        category: payload.category || "other",
        note: payload.note || "Crédité instantanément",
        timestamp: Date.now(),
        status: "completed",
      });
      state.error = null;
      state.notification = {
        message: `Dépôt de +${payload.amount.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} ${state.currency} effectué avec succès !`,
        type: "success",
      };
    },

    withdraw(
      state,
      action: PayloadAction<{
        amount: number;
        category?: TransactionCategory;
        title?: string;
        note?: string;
      } | number>
    ) {
      const payload =
        typeof action.payload === "number"
          ? { amount: action.payload, category: "other" as TransactionCategory, title: "Retrait de fonds", note: "" }
          : action.payload;

      if (payload.amount <= 0 || isNaN(payload.amount)) {
        state.error = "Veuillez saisir un montant valide supérieur à 0.";
        return;
      }

      if (state.card.isFrozen) {
        state.error = "Opération refusée : votre carte est actuellement gelée.";
        state.notification = {
          message: "Carte verrouillée. Débloquez-la pour effectuer des retraits.",
          type: "error",
        };
        return;
      }

      if (state.solde < payload.amount) {
        state.error = `Solde insuffisant. Vous disposez de ${state.solde.toFixed(2)} ${state.currency}.`;
        state.notification = {
          message: "Échec du retrait : fonds insuffisants.",
          type: "error",
        };
        return;
      }

      state.solde -= payload.amount;
      state.transactions.unshift({
        id: `tx-${Date.now()}`,
        type: "withdraw",
        amount: payload.amount,
        title: payload.title || "Retrait bancaire",
        category: payload.category || "other",
        note: payload.note || "Débité du compte",
        timestamp: Date.now(),
        status: "completed",
      });
      state.error = null;
      state.notification = {
        message: `Retrait de -${payload.amount.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} ${state.currency} effectué avec succès.`,
        type: "info",
      };
    },

    transfer(
      state,
      action: PayloadAction<{
        amount: number;
        recipient: string;
        note?: string;
      }>
    ) {
      const { amount, recipient, note } = action.payload;

      if (amount <= 0 || isNaN(amount)) {
        state.error = "Montant de virement invalide.";
        return;
      }

      if (state.solde < amount) {
        state.error = `Solde insuffisant pour ce virement (${state.solde.toFixed(2)} ${state.currency} disponible).`;
        state.notification = {
          message: "Virement rejeté : solde disponible insuffisant.",
          type: "error",
        };
        return;
      }

      state.solde -= amount;
      state.transactions.unshift({
        id: `tx-${Date.now()}`,
        type: "transfer",
        amount,
        title: `Virement vers ${recipient}`,
        category: "transfer",
        recipient,
        note: note || "Virement instantané interbancaire",
        timestamp: Date.now(),
        status: "completed",
      });
      state.error = null;
      state.notification = {
        message: `Virement de ${amount.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} ${state.currency} envoyé à ${recipient} !`,
        type: "success",
      };
    },

    toggleFreezeCard(state) {
      state.card.isFrozen = !state.card.isFrozen;
      state.notification = {
        message: state.card.isFrozen
          ? "Carte bancaire gelée. Les retraits et débits sont temporairement bloqués."
          : "Carte bancaire réactivée. Toutes vos opérations sont disponibles.",
        type: state.card.isFrozen ? "info" : "success",
      };
      state.error = null;
    },

    setCurrency(state, action: PayloadAction<"MAD" | "EUR" | "USD">) {
      state.currency = action.payload;
    },

    clearNotification(state) {
      state.notification = null;
    },

    clearError(state) {
      state.error = null;
    },

    deleteTransaction(state, action: PayloadAction<string>) {
      const tx = state.transactions.find((t) => t.id === action.payload);
      if (tx) {
        state.transactions = state.transactions.filter((t) => t.id !== action.payload);
        state.notification = {
          message: `Transaction "${tx.title}" supprimée de l'historique.`,
          type: "info",
        };
      }
    },

    loadDemoData(state) {
      state.solde = 28450;
      state.transactions = [
        ...initialTransactions,
        {
          id: `tx-${Date.now() - 30000}`,
          type: "deposit",
          amount: 5500,
          title: "Prime performance Q3",
          category: "salary",
          note: "Bonus trimestriel",
          timestamp: Date.now() - 1000 * 60 * 30,
          status: "completed",
        },
      ];
      state.card.isFrozen = false;
      state.error = null;
      state.notification = {
        message: "Données de démonstration chargées avec succès !",
        type: "success",
      };
    },

    resetAccount(state) {
      state.solde = 0;
      state.transactions = [];
      state.card.isFrozen = false;
      state.error = null;
      state.notification = {
        message: "Compte et historique réinitialisés à zéro.",
        type: "info",
      };
    },
  },
});

export const {
  deposit,
  withdraw,
  transfer,
  toggleFreezeCard,
  setCurrency,
  clearNotification,
  clearError,
  deleteTransaction,
  loadDemoData,
  resetAccount,
} = compteSlice.actions;

export default compteSlice.reducer;
