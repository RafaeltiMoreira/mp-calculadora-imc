import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Label } from "./components/Label";
import { ReferenceTable } from "./components/ReferenceTable";
import { IMCResult, calculateIMC } from "./lib/IMC";
import { ResultsTable } from "./components/ResultsTable";
import { Toaster, toast } from "sonner";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

export function App() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);
  const [IMCData, setIMCData] = useState<null | {
    weight: number;
    height: number;
    IMC: number;
    IMCResult: string;
  }>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
      //alert("Ops... você precisa preencher todos os campos.");
      toast.error("Ops... você precisa preencher todos os campos.");
      return;
    }

    // parse and handle string to number
    const weightNumber = parseFloat(weight.replace(",", "."));
    const heightNumber = parseFloat(height.replace(",", ".")) / 100;

    if (isNaN(weightNumber) || isNaN(heightNumber)) {
      //alert("Ops... você precisa preencher os campos com números válidos.");
      toast.error(
        "Ops... você precisa preencher os campos com números válidos."
      );
      return;
    }

    //console.log({ weightNumber, heightNumber });

    // handle invalid numbers
    if (weightNumber < 2 || weightNumber > 500) {
      //alert("O peso informado precisa ser maior que 2kg e menor que 500kg.");
      toast.error(
        "O peso informado precisa ser maior que 2kg e menor que 500kg."
      );
    } else if (heightNumber < 0.5 || heightNumber > 2.5) {
      //alert("A altura informada precisa ser maior que 50cm e menor que 2,5m.");
      toast.error(
        "A altura informada precisa ser maior que 50cm e menor que 2,5m."
      );
    } else {
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
      e.currentTarget.reset();
    }
  }
  function handleClickReset(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIMCData(null);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleThemeSwitch}
        className="fixed z-10 right-2 top-2 bg-white dark:bg-rose-500 text-lg p-3 rounded-full"
        title={
          theme === "dark" ? "Desativar modo Dark" : "Desativar modo Light"
        }
      >
        {theme === "dark" ? (
          <MdDarkMode className="dark:text-white" />
        ) : (
          <MdOutlineLightMode className="text-rose-500" />
        )}
      </button>
      <Toaster richColors closeButton />
      <main className="bg-white dark:bg-gray-600 max-w-4xl mx-auto md:py-24 md:px-48 px-5 py-28">
        <section id="form">
          <form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                disabled={!!IMCData}
                type="text"
                id="weight"
                name="weight"
                className="mt-1"
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="height">Altura (cm)</Label>
              <Input
                disabled={!!IMCData}
                type="text"
                id="height"
                name="height"
                className="mt-1"
              />
            </div>
            {IMCData ? (
              <Button onClick={handleClickReset} type="button">
                Refazer
              </Button>
            ) : (
              <Button type="submit">Calcular</Button>
            )}
          </form>
        </section>
        <section id="result" className="py-10 px-4 h-40">
          {IMCData ? (
            <ResultsTable IMCData={IMCData} />
          ) : (
            <p className="text-center text-neutral-400 dark:text-neutral-200 text-xl">
              Saiba agora se está no seu peso ideal!
            </p>
          )}
        </section>
        <section id="reference-table">
          <ReferenceTable />
        </section>
      </main>
    </>
  );
}
