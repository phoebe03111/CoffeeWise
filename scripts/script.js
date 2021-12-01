const allCoffees = [
  {
    name: "Light Roast",
    value: "light-roast",
    caffeine: {
      short: 180,
      tall: 270,
      grande: 360,
      venti: 475,
    },
  },
  {
    name: "Medium Roast",
    value: "medium-roast",
    caffeine: {
      short: 155,
      tall: 235,
      grande: 310,
      venti: 410,
    },
  },
  {
    name: "Dark Roast",
    value: "dark-roast",
    caffeine: {
      short: 130,
      tall: 195,
      grande: 260,
      venti: 340,
    },
  },
  {
    name: "Brewed Decaf Coffee",
    value: "decaf-roast",
    caffeine: {
      short: 15,
      tall: 20,
      grande: 25,
      venti: 30,
    },
  },
  {
    name: "Americano",
    value: "americano",
    caffeine: {
      short: 75,
      tall: 150,
      grande: 225,
      venti: 300,
    },
  },
  {
    name: "Latte",
    value: "latte",
    caffeine: {
      short: 75,
      tall: 75,
      grande: 150,
      venti: 150,
    },
  },
  {
    name: "Cappuccino",
    value: "cappuccino",
    caffeine: {
      short: 75,
      tall: 75,
      grande: 150,
      venti: 150,
    },
  },
  {
    name: "Flat White",
    value: "flatWhite",
    caffeine: {
      short: 130,
      tall: 130,
      grande: 195,
      venti: 195,
    },
  },
  {
    name: "Iced coffee",
    value: "icedCoffee",
    caffeine: {
      short: null,
      tall: 165,
      grande: 235,
      venti: 280,
    },
  },
  {
    name: "Iced Americano",
    value: "icedAmericano",
    caffeine: {
      short: null,
      tall: 150,
      grande: 225,
      venti: 300,
    },
  },
  {
    name: "Iced Latte",
    value: "icedLatte",
    caffeine: {
      short: null,
      tall: 75,
      grande: 150,
      venti: 225,
    },
  },
  {
    name: "Iced Cappuccino",
    value: "icedCappuccino",
    caffeine: {
      short: null,
      tall: 75,
      grande: 150,
      venti: 225,
    },
  },
  {
    name: "Iced Flat White",
    value: "icedFlatWhite",
    caffeine: {
      short: null,
      tall: 130,
      grande: 195,
      venti: 260,
    },
  },
  {
    name: "Cold Brew",
    value: "coldBrew",
    caffeine: {
      short: null,
      tall: 155,
      grande: 205,
      venti: 310,
    },
  },
  {
    name: "Nitro Cold Brew",
    value: "nitroColdBrew",
    caffeine: {
      short: null,
      tall: 215,
      grande: 280,
      venti: null,
    },
  },
];

// Cascading dropdown menu using jQuery
$(".selectFilter").on("change", function () {
  var e = $(this).data("target"),
    i = $(this).find(":selected").data("ref");
  $("select." + e).val("-1"),
    null == i
      ? $("select." + e)
          .find("option")
          .each(function () {
            console.log("inside undefined"),
              $(this).removeAttr("disabled hidden");
          })
      : $("select." + e)
          .find("option")
          .each(function () {
            var e = $(this).data("belong"),
              t = $(this).val();
            i != e && -1 != t
              ? ($(this).prop("disabled", !0), $(this).prop("hidden", !0))
              : ($(this).prop("disabled", !1), $(this).prop("hidden", !1));
          });
});

const main = document.querySelector("main");
const form = document.querySelector("form");
const selectedItem = document.getElementById("selectedItem");
const totalCaffeineEl = document.querySelector(".totalCaffeineEl");
const plusIcon = document.querySelector(".plus-icon");

function displayCaffineAmount(item) {
  const section = document.createElement("section");
  section.classList.add(
    "container",
    "d-flex",
    "flex-column",
    "align-items-center",
    "cups__section"
  );
  section.innerHTML = `      
  <div class="d-flex align-items-center">
    <img
      class="coffee-bean"
      src="/assets/coffee-beans.png"
      alt="coffee beans"
    />
    <h3 class="cups__name mx-3">${item.name}</h3>
    <img
      class="coffee-bean"
      src="/assets/coffee-beans.png"
      alt="coffee beans"
    />
  </div>

  <div class="d-flex align-items-end mb-3 mt-2 cups">
    <div class="d-flex flex-column align-items-center">
      <div class="cups__cup cups__cup--short">
        <span class="cup__numS h4">${item.caffeine.short || "-"}</span> mg
      </div>
      <p>Short (8oz)</p>
    </div>

    <div class="d-flex flex-column align-items-center">
      <div class="cups__cup cups__cup--tall">
        <span class="cup__numT h4">${item.caffeine.tall}</span> mg
      </div>
      <p>Tall (12oz)</p>
    </div>

    <div class="d-flex flex-column align-items-center">
      <div class="cups__cup cups__cup--grande">
        <span class="cup__numG h4">${item.caffeine.grande}</span> mg
      </div>
      <p>Grande (16oz)</p>
    </div>

    <div class="d-flex flex-column align-items-center">
      <div class="cups__cup cups__cup--venti">
        <span class="cup__numV h4">${item.caffeine.venti || "-"}</span> mg
      </div>
      <p>Venti (20oz)</p>
    </div>
  </div>
`;
  main.appendChild(section);
  highlightCup();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let selected = selectedItem.value;

  allCoffees.forEach((coffee) => {
    if (coffee.value === selected) {
      displayCaffineAmount(coffee);
    }
  });

  form.reset();
});

function highlightCup() {
  const cups = document.querySelectorAll(".cups__cup");
  cups.forEach((cup) => {
    cup.addEventListener("click", () => {
      cup.classList.toggle("cups__cup--active");
    });
  });
}

plusIcon.addEventListener("click", () => {
  let totalCaffeine = 0;
  const highlighted = document.querySelectorAll(".cups__cup--active");
  highlighted.forEach((item) => {
    let value = item.firstElementChild.innerText;
    totalCaffeine += Number(value);
  });
  totalCaffeineEl.innerText = totalCaffeine;
  if (totalCaffeine > 400) {
    totalCaffeineEl.style.color = "red";
  } else {
    totalCaffeineEl.style.color = "green";
  }
});