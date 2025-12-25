"use client";
import { useSelector, useDispatch } from "react-redux";
import { deposit, withdraw, resetAccount } from "../Features/compteReducer";
import { useState } from "react";

export default function BankAccount() {
    const dispatch = useDispatch();
    const { solde, transactions, error } = useSelector((state: any) => state.compte);

    const [amount, setAmount] = useState("");

    const handleDeposit = () => {
        const value = parseFloat(amount);
        if (value && value > 0) {
            dispatch(deposit(value));
            setAmount("");
        }
    };

    const handleWithdraw = () => {
        const value = parseFloat(amount);
        if (value && value > 0) {
            dispatch(withdraw(value));
            setAmount("");
        }
    };

    const handleReset = () => {
        if (window.confirm("Êtes-vous sûr de vouloir réinitialiser le compte ?")) {
            dispatch(resetAccount());
        }
    };

    return (
        <div className="container">
            <div className="animate-fade-in">
                <h1 className="text-center" style={{ marginBottom: "2rem" }}>
                    🏦 Compte Bancaire Redux
                </h1>

                {/* Balance Card */}
                <div className="glass-card text-center" style={{ marginBottom: "2rem" }}>
                    <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--text-muted)" }}>
                        SOLDE ACTUEL
                    </p>
                    <h2 className="text-gradient" style={{ fontSize: "3.5rem", margin: "1rem 0" }}>
                        {solde.toFixed(2)} €
                    </h2>
                    {error && (
                        <div className="badge badge-danger" style={{ marginTop: "1rem" }}>
                            ⚠️ {error}
                        </div>
                    )}
                </div>

                {/* Actions Card */}
                <div className="card" style={{ marginBottom: "2rem" }}>
                    <h3 style={{ marginBottom: "1.5rem" }}>💰 Opérations</h3>

                    <div className="form-group">
                        <label className="form-label">Montant</label>
                        <input
                            type="number"
                            className="form-input"
                            placeholder="Entrez le montant..."
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="flex" style={{ gap: "1rem", marginBottom: "1rem" }}>
                        <button
                            className="btn btn-secondary"
                            onClick={handleDeposit}
                            disabled={!amount || parseFloat(amount) <= 0}
                            style={{ flex: 1 }}
                        >
                            ➕ Déposer
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={handleWithdraw}
                            disabled={!amount || parseFloat(amount) <= 0}
                            style={{ flex: 1 }}
                        >
                            ➖ Retirer
                        </button>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleReset}
                        style={{ width: "100%" }}
                    >
                        🔄 Réinitialiser le compte
                    </button>
                </div>

                {/* Transactions History */}
                <div className="card">
                    <div className="flex-between" style={{ marginBottom: "1.5rem" }}>
                        <h3 style={{ margin: 0 }}>📊 Historique des transactions</h3>
                        <span className="badge badge-success">
                            {transactions.length} transaction{transactions.length > 1 ? "s" : ""}
                        </span>
                    </div>

                    {transactions.length === 0 ? (
                        <p className="text-center" style={{ color: "var(--text-muted)", padding: "2rem 0" }}>
                            Aucune transaction pour le moment
                        </p>
                    ) : (
                        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                            {transactions
                                .slice()
                                .reverse()
                                .map((transaction: any) => (
                                    <div
                                        key={transaction.id}
                                        className="glass-card"
                                        style={{
                                            marginBottom: "0.75rem",
                                            padding: "1rem",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                            <span style={{ fontSize: "1.5rem" }}>
                                                {transaction.type === "deposit" ? "💵" : "💸"}
                                            </span>
                                            <div>
                                                <p style={{ fontWeight: 600, margin: 0 }}>
                                                    {transaction.type === "deposit" ? "Dépôt" : "Retrait"}
                                                </p>
                                                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
                                                    {new Date(transaction.id).toLocaleString("fr-FR")}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "1.25rem",
                                                fontWeight: 700,
                                                color: transaction.type === "deposit" ? "var(--secondary)" : "var(--danger)",
                                            }}
                                        >
                                            {transaction.type === "deposit" ? "+" : "-"}
                                            {transaction.amount.toFixed(2)} €
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
