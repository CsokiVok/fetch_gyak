import 'bootstrap/dist/css/bootstrap.css'

interface Hozzaferes{
  id: number;
  nev: string;
  kartyaszam: number;
  cvv: number;
}

async function adatLetoltes(){
  try{
    const response = await fetch('https://retoolapi.dev/XoNekD/data');
    const adatok = await response.json() as Hozzaferes[];
    var temp = "";

    adatok.forEach(data => {
      temp += "<tr>";
            temp += "<td>"+ data.id +"</td>";
            temp += "<td>"+ data.nev +"</td>";
            temp += "<td>"+ data.kartyaszam +"</td>";
            temp += "<td>"+ data.cvv +"</td>";
            temp += `<td><button class="btn btn-outline-danger torles-btn" data-id="${data.id}">Törlés</button></td>`; 
      temp += "</tr>";
    });

    document.getElementById("adatok")!.innerHTML = temp;

    document.querySelectorAll(".torles-btn").forEach(button => {
      button.addEventListener("click", (event) => {
        const target = event.target as HTMLButtonElement;
        const id = parseInt(target.getAttribute("data-id")!);
        torles(id);
      });
    });
  }
  catch(e: any){
    document.getElementById("errorMessage")!.textContent = "hiba " + e.message;
  }
}

async function torles(id: number) {
  try {
    const res = await fetch(`https://retoolapi.dev/XoNekD/data/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      adatLetoltes();
    } else {
      document.getElementById("errorMessage")!.textContent = 
      'Hiba a törlés közben';
    }
  } catch (e: any) {
    document.getElementById("errorMessage")!.textContent = 
    "hiba " + e.message;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const nevInput = document.getElementById("nevInput") as HTMLInputElement;
  const kartyaszamInput = document.getElementById("kartyaszamInput") as HTMLInputElement;
  const cvvInput = document.getElementById("cvvInput") as HTMLInputElement;
  document.getElementById("ujadat")?.addEventListener('click', async() => {
    const ujAdat = {
        nev: nevInput.value,
        kartyaszam: kartyaszamInput.value,
        cvv: cvvInput.value,
    }
    
    const res = await fetch('https://retoolapi.dev/XoNekD/data', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(ujAdat),
    })

    if(res.ok){
        location.reload();
    } else{
        document.getElementById("errorMessage")!.textContent = 
        'Hiba a feltöltés közben';
    }
  })

  adatLetoltes();
})