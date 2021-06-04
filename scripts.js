/* -----Menu de hamburguesa----- */
const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  (() => {
    function hamburguerMenu(menu, menubtn, menuLink) {
      d.addEventListener("click", (e) => {
        if (e.target.matches(menubtn)) {
          d.querySelector(menu).classList.toggle("is-active");
          d.querySelector(menubtn).classList.toggle("btn-effect");
        }

        if (e.target.matches(menuLink)) {
          d.querySelector(menu).classList.remove("is-active");
          d.querySelector(menubtn).classList.remove("btn-effect");
        }
      });
    }

    hamburguerMenu(".menu-nav", ".menu-btn", ".item");
  })();

  /* -----Modal Content----- */
  (() => {
    const $modal = d.querySelector(".modal"),
      $modalContent = d.querySelectorAll(".modal-content");

    $modalContent.forEach((el) => {
      d.addEventListener("click", (e) => {
        //console.log(e.target);
        if (e.target.matches(".planes-card a *")) {
          if (
            e.target.alt === el.lastElementChild.alt ||
            e.target.value === el.firstElementChild.value
          ) {
            $modal.classList.remove("none");
            d.querySelector(
              `.modal-content [alt="${e.target.alt}"]`
            ).parentElement.classList.remove("none");
          }
        }
        if (e.target.matches("a.modal-close *")) {
          $modal.classList.add("none");
          el.classList.add("none");
        }
      });
    });
  })();

  /* -----Form Contact----- */
  (() => {
    const $formContact = d.querySelectorAll(".form-contact");
    const $label = d.querySelectorAll(".link-container label");

    d.addEventListener("click", (e) => {
      if (e.target.matches(".link-container label")) {
        $label.forEach((el) => {
          el.classList.remove("link-active");
          e.target.classList.add("link-active");
        });

        if (e.target.for === $formContact.id) {
          $formContact.forEach((el) => {
            //console.log(e.target.getAttribute("for"));
            el.classList.remove("form-active");
            d.querySelector(
              `.form-contact[id=${e.target.getAttribute("for")}]`
            ).classList.add("form-active");
          });
        }
      }
    });
  })();

  /* ----- Form Contact Validations ----- */
  (() => {
    const $form = d.querySelector(`.form-contact form`),
      $inputs = d.querySelectorAll(".form-contact [required]");

    $inputs.forEach((el) => {
      const $span = d.createElement("span");
      $span.id = el.name;
      $span.textContent = el.title;
      $span.classList.add("form-contact-error", "none-form");
      el.insertAdjacentElement("afterend", $span);
      //console.log(el, $inputs);
    });

    d.addEventListener("keyup", (e) => {
      if (e.target.matches(".form-contact [required]")) {
        let $input = e.target,
          pattern = $input.pattern || $input.dataset.patter;

        if (pattern && $input.value !== "") {
          let regex = new RegExp(pattern);
          if (!regex.exec($input.value)) {
            $input.nextElementSibling.classList.add("is-active-form");
          } else {
            $input.nextElementSibling.classList.remove("is-active-form");
          }
        }

        if (!pattern) {
          return $input.value === ""
            ? d.getElementById($input.name).classList.add("is-active-form")
            : d.getElementById($input.name).classList.remove("is-active-form");
        }
      }
    });
  })();

  /* ----- Send Form ----- */
  (() => {
    document.addEventListener("submit", (e) => {
      e.preventDefault();
      const $gracias = document.getElementById("gracias"),
        $error = document.getElementById("error");
      ($formResponse = document.querySelector(".modal#gracias .modal-content")),
        ($formLoader = document.querySelector(".contact-form-loader"));

      $gracias.classList.remove("none");
      $formLoader.classList.remove("none-form");

      //console.log(e.target);
      fetch("https://formsubmit.co/ajax/eliancarlogm@gmail.com", {
        method: "POST",
        body: new FormData(e.target),
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => {
          console.log(data);
          $formResponse.classList.remove("none");
          e.target.reset();
        })
        .catch((error) => {
          console.log(error);
          $error.classList.remove("none");
        })
        .finally(() => {
          $formLoader.classList.add("none-form");
          if (
            $formResponse.classList.contains("none") &&
            $error.classList.contains("none")
          ) {
            $gracias.classList.add("none");
          } else {
            setTimeout(() => {
              $formResponse.classList.add("none");
              $error.classList.add("none");
              $gracias.classList.add("none");
            }, 3000);
          }
        });
    });
  })();
});
