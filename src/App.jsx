import "./style.css";
import empty from "./assets/empty-button.png";
import marked from "./assets/marked-button.png";
import fliz from "./assets/fliz.png";
import paypal from "./assets/paypal.png";
import visa from "./assets/visa.png";
import sepa from "./assets/sepa.png";
import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import axios from "axios";

function App() {
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState(null);
  const [deepLink, setDeepLink] = useState("");

  const generateDeepLink = async () => {
    try {
      const response = await axios.post(
        "https://api.flizpay.de/transactions",
        {
          amount: customAmount !== "0" ? Number(customAmount) : currentAmount,
          currency: "EUR",
          externalId: "amffedfdfrghtmasffsemxcmasfmmffrkxa",
        },
        {
          headers: {
            "x-api-key":
              "66367907c028c9e4118843a9b650ffebc966d952961334899ed304804f3f66fb",
          },
        }
      );
      setDeepLink(response.data.data.deepLink);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    generateDeepLink();
  }, [currentAmount, customAmount]);

  const amounts = [
    {
      id: 1,
      amount: 20,
    },
    {
      id: 2,
      amount: 50,
    },
    {
      id: 3,
      amount: 100,
    },
    {
      id: 4,
      amount: "Write amount",
    },
  ];

  const paymentMethods = [
    {
      id: 1,
      name: "Fliz Pay - 100% gets paid out",
      logo: fliz,
    },
    {
      id: 2,
      name: "PayPal",
      logo: paypal,
    },
    {
      id: 3,
      name: "Credit Card",
      logo: visa,
    },
    {
      id: 4,
      name: "Direct Debit  (max. 5000,00 €)",
      logo: sepa,
    },
  ];

  return (
    <main className="container">
      <section className="section">
        <h1 className="title">Choose your donation amount</h1>

        {amounts.map((amount) => {
          return amount.id !== 4 ? (
            <div
              key={amount.id}
              onClick={() => {
                setSelectedAmount(amount.id);
                setCurrentAmount(amount.amount);
              }}
              className="input"
            >
              <img
                src={amount.id === selectedAmount ? marked : empty}
                className="circle"
              />

              <h2 className="amount">€ {amount.amount}</h2>
            </div>
          ) : (
            <div
              key={amount.id}
              onClick={() => {
                setSelectedAmount(amount.id);
                setCurrentAmount(amount.amount);
              }}
              className="input"
            >
              <img
                src={amount.id === selectedAmount ? marked : empty}
                className="circle"
              />

              <h1 className="euro">€</h1>
              <input
                className="amountInput"
                type="text"
                placeholder={amount.amount}
                value={customAmount}
                onChange={(event) => setCustomAmount(event.target.value)}
              />
            </div>
          );
        })}
      </section>

      <section className="section">
        <h1 className="title">Your payment method</h1>

        {paymentMethods.map((method) => {
          return (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className="input"
            >
              <img
                src={method.id === selectedMethod ? marked : empty}
                className="circle"
              />
              <img src={method.logo} className="logo" />
              <h2 className="h2">{method.name}</h2>
            </div>
          );
        })}

        <a className="button" href={deepLink}>
          Donate now
        </a>
      </section>

      <div className="bottomContainer">
        <FaLock size={24} color="grey" className="lock" />
        <div className="bottomContainerTextContainer">
          <h4 className="h4">Secure donation</h4>
          <span className="span">
            The data you provide are delivered through a SSL
            (Secure-Socket-Layer) encrypted internet connection and are secured
            all the time.
          </span>
        </div>
      </div>
    </main>
  );
}

export default App;

