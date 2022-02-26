// module
let app = angular.module("myApp", ["ngRoute"])
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", { templateUrl: "home.html" })
    .when("/contact", { templateUrl: "contact.html" })
    .when("/login", { templateUrl: "login.html" })
    .when("/professional", { templateUrl: "professional.html" })
    .when("/research", { templateUrl: "research.html" })
    .when("/clinic", { templateUrl: "dental_clinic.html" })
    .when("/faq", { templateUrl: "faq.html" })
})


// Btn contact send
function send() {
  var name = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value
  var message = document.getElementById("message").value;

  if (name == null || name == "") {
    alert(" At least let us know your name! ");
    return false;
  }

  if (phone == null || phone == "") {
    alert("Enter your phone number so we can contact you.");
    return false;
  }

  if (email == null || email == "") {
    alert(" Enter your email so we can contact you. Example: Smiles32@gmail.com");
    return false;
  }

  if (message == null || message == "") {
    alert("Please enter your message.");
    return false;
  }
}


// carousel slick
window.onload = function () {
  $('.autoplay').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: false,
  });
};

app.run(function ($rootScope, $http) {
  $http.get("../data.json")
    .then(function (response) {
      $rootScope.products = response.data.product
      $rootScope.displayItems = response.data.research
      $rootScope.students = response.data.stuRescources
    });

})

app.controller("listCTR", function ($scope) { })
app.controller("studentCTR", function ($scope) { })


// link img home page
function onGoToPage(namePage) {
  if (namePage === "") {
    window.location = "https://quangnam014.github.io/eProject-g2/html/index.html" + namePage;
  }
  window.location = "https://quangnam014.github.io/eProject-g2/html/index.html" + namePage;
}


// modal - login
var auth = document.getElementsByClassName("form_style");
var modal = document.getElementsByClassName("modal");
var loginForm = document.getElementsByClassName("login_form");
var registerForm = document.getElementsByClassName("register_form");
var overlay = document.getElementsByClassName("modal_overlay");
var back = document.getElementsByClassName("auth_form-controls-back");
var errorLogin = document.getElementsByClassName("auth_form-error-login")
var errorRegister = document.getElementsByClassName("auth_form-error-register")
var form = document.getElementsByClassName("form")
var logOut = document.getElementsByClassName("header_navbar-item")

function Login() {
  modal[0].style.display = "flex"
  loginForm[0].style.display = "block"
  registerForm[0].style.display = "none"
}

function Register() {
  modal[0].style.display = "flex"
  registerForm[0].style.display = "block"
  loginForm[0].style.display = "none"
}

for (i = 0; i < back.length; i++) {
  back[i].onclick = function () {
    modal[0].style.display = "none"
  }
}

function overLay() {
  modal[0].style.display = "none"
}

function handleRegister() {
  var email = document.querySelector('input[name="emailRg"]').value
  var password = document.querySelector('input[name="passwordRg"]').value
  var password1 = document.querySelector('input[name="passwordRg1"]').value

  if (email == null || email == "") {
    alert(" Enter your email. Example: Smiles32@gmail.com");
    return false
  }

  if (password == null || password == "") {
    alert(" Enter your password. Example: 123456 or smile32");
    return false
  }
  if (password === password1) {
    $(':input').val('');
    errorRegister[0].style.display = "none"
    overLay()
    alert("Thank You for Registration")
  } else {
    console.log("123")
    errorRegister[0].style.display = "block"
  }
}


function handleLogin() {
  var emailEdit = document.querySelector('input[name="emailLg"]').value
  var passwordEdit = document.querySelector('input[name="passwordLg"]').value

  if (emailEdit == null || emailEdit == "") {
    alert(" Enter your email. Example: Smiles32@gmail.com");
    return false
  }

  if (passwordEdit == null || passwordEdit == "") {
    alert(" Enter your password. Example: 123456 or smile32");
    return false
  }
  handleLoginPage()
}

function handleLoginPage() {
  alert("Thank You for Login")
  $(':input').val('')
  overLay()

}

// a xuân
(function () {
  function PagingController($scope) {
    $scope.pager = {};
    $scope.pagingSize = $scope.pagingSize || 10;
    $scope.itemPerPage = $scope.itemPerPage || 6;
    function setPager(itemCount, currentPage, itemPerPage) {
      currentPage = currentPage || 1;
      var startPage, endPage;
      var totalPages = Math.ceil(itemCount / itemPerPage);
      if (totalPages <= $scope.pagingSize) {
        startPage = 1;
        endPage = totalPages;
      } else {
        if (currentPage + 1 >= totalPages) {
          startPage = totalPages - ($scope.pagingSize - 1);
          endPage = totalPages;
        } else {
          startPage = currentPage - parseInt($scope.pagingSize / 2);
          startPage = startPage <= 0 ? 1 : startPage;
          endPage =
            startPage + $scope.pagingSize - 1 <= totalPages
              ? startPage + $scope.pagingSize - 1
              : totalPages;
          if (totalPages === endPage) {
            startPage = endPage - $scope.pagingSize + 1;
          }
        }
      }

      var startIndex = (currentPage - 1) * itemPerPage;
      var endIndex = startIndex + itemPerPage - 1;

      var index = startPage;
      var pages = [];
      for (; index < endPage + 1; index++) pages.push(index);

      $scope.pager.currentPage = currentPage;
      $scope.pager.totalPages = totalPages;
      $scope.pager.startPage = startPage;
      $scope.pager.endPage = endPage;
      $scope.pager.startIndex = startIndex;
      $scope.pager.endIndex = endIndex;
      $scope.pager.pages = pages;
    }

    $scope.setPage = function (currentPage) {
      if (currentPage < 1 || currentPage > $scope.pager.totalPages) return;
      setPager($scope.totalItems.length, currentPage, $scope.itemPerPage);
      $scope.displayItems = $scope.totalItems.slice(
        $scope.pager.startIndex,
        $scope.pager.endIndex + 1
      );
    };

    $scope.setPage(1);
  }


  app.run(function ($rootScope, $http) {
    $http.get("../data.json")
      .then(function (response) {
        $rootScope.totalItems = response.data.research
      });
  })

  app
    .controller("PageController", function ($scope) { })
    .directive("pagingControl", [
      function () {
        return {
          restrict: "E",
          templateUrl: "paging.html",
          controller: ["$scope", PagingController],
          scope: {
            totalItems: "=",
            displayItems: "=",
            pagingSize: "=",
            itemPerPage: "=noofitem",
          },
        };
      },
    ]);
})();

app.controller("professional", ["$scope", function ($scope) {
  $scope.myView = "overview";
}
]);


// anh trung
app.controller("faq",function(){
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
})

app.controller("clinic", [
  "$scope",
  function ($scope) {
    $scope.viewClinic = "default";
  },
]);
