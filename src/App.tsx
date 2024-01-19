export function App() {
  return (
    <main>
      <section id="form">
        <form>
          <div>
            <label htmlFor="weight">Peso (kg)</label>
            <input type="text" id="weight" />
          </div>
          <div>
            <label htmlFor="height">Altura (cm)</label>
            <input type="text" id="height" />
          </div>
          <button>Calcular</button>
        </form>
      </section>
      <section id="result">
        <p>Saiba agora se está no seu peso ideal!</p>
      </section>
      <section id="reference-table">
        <table>
          <thead>
            <tr>
              <th>IMC</th>
              <th>Classificação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Menos de 17</td>
              <td>Muito abaixo do peso</td>
            </tr>
            <tr>
              <td>Entre 17 e 18,49</td>
              <td>Abaixo do peso</td>
            </tr>
            <tr>
              <td>Entre 18,5 e 24,99</td>
              <td>Peso normal</td>
            </tr>
            <tr>
              <td>Entre 25 e 29,99</td>
              <td>Acima do peso</td>
            </tr>
            <tr>
              <td>Entre 30 e 34,99</td>
              <td>Obesidade I</td>
            </tr>
            <tr>
              <td>Entre 35 e 39,99</td>
              <td>Obesidade II (severa)</td>
            </tr>
            <tr>
              <td>Acima de 40</td>
              <td>Obesidade III (mórbida)</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
