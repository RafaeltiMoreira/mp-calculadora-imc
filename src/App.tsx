import { useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Label } from "./components/Label";
import { ReferenceTable } from "./components/ReferenceTable";
import { IMCResult, calculateIMC } from "./lib/IMC";
import { ResultsTable } from "./components/ResultsTable";

export function App() {
  const [IMCData, setIMCData] = useState<null | {
    weight: number;
    height: number;
    IMC: number;
    IMCResult: string;
  }>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // get data form
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as {
      weight: string;
      height: string;
    };

    // handle empty fields
    const { weight, height } = data;
    if (!weight || !height) {
      alert("Ops... você precisa preencher todos os campos.");
      return;
    }

    // parse and handle string to number
    const weightNumber = parseFloat(weight.replace(",", "."));
    const heightNumber = parseFloat(height.replace(",", ".")) / 100;

    if (isNaN(weightNumber) || isNaN(heightNumber)) {
      alert("Ops... você precisa preencher os campos com números válidos.");
      return;
    }

    console.log({ weightNumber, heightNumber });

    // handle invalid numbers
    if (weightNumber < 2 || weightNumber > 500) {
      alert("O peso informado precisa ser maior que 2kg e menor que 500kg.");
    }

    if (heightNumber < 0.5 || heightNumber > 2.5) {
      alert("A altura informada precisa ser maior que 50cm e menor que 2,5m.");
    }

    // calc IMC
    const IMC = calculateIMC(weightNumber, heightNumber);
    const IMCResultCalc = IMCResult(IMC);
    console.log(IMC);
    console.log(IMCResultCalc);

    // set result
    setIMCData({
      weight: weightNumber,
      height: heightNumber,
      IMC: IMC,
      IMCResult: IMCResultCalc,
    });

    // clear form
  }

  return (
    <main className="bg-white max-w-4xl mx-auto py-24 px-48">
      <section id="form">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="weight">Peso (kg)</Label>
            <Input type="text" id="weight" name="weight" className="mt-1" />
          </div>
          <div className="mt-4">
            <Label htmlFor="height">Altura (cm)</Label>
            <Input type="text" id="height" name="height" className="mt-1" />
          </div>
          <Button type="submit">Calcular</Button>
        </form>
      </section>
      <section id="result" className="py-10 px-4 h-40">
        {IMCData ? (
          <ResultsTable IMCData={IMCData} />
        ) : (
          <p className="text-center text-neutral-400 text-xl">
            Saiba agora se está no seu peso ideal!
          </p>
        )}
      </section>
      <section id="reference-table">
        <ReferenceTable />
      </section>
    </main>
  );
}
