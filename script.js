'use strict';

function iframeLoaded() {
  console.log('Game iframe loaded successfully');
}

function showAuthModal() {
  $('#authModal').fadeIn(300);
  $('.overlay').addClass('active');
  openTab('login');
}

function closeModal() {
  $('#authModal').fadeOut(300);
  $('.overlay').removeClass('active');
}

function showAlertModal(message) {
  $('#alertMessage').text(message);
  $('#alertModal').fadeIn(300);
  $('.overlay').addClass('active');
}

function closeAlertModal() {
  $('#alertModal').fadeOut(300);
  $('.overlay').removeClass('active');
}

function openTab(tabName) {
  $('.tab-link').removeClass('active');
  $('.tab-content').removeClass('active');
  $(`.tab-link[onclick="openTab('${tabName}')"]`).addClass('active');
  $(`#${tabName}`).addClass('active');
}

function login() {
  const email = $('#loginEmail').val();
  const password = $('#loginPassword').val();
  if (email && password) {
    localStorage.setItem('userState', JSON.stringify({
      isLoggedIn: true,
      username: email.split('@')[0],
      email: email,
      coins: 10000
    }));
    $('#user-name').text(email.split('@')[0]);
    $('#user-details').text(`Name: ${email.split('@')[0]}\nEmail: ${email}\nCoins: 10000`);
    $('#auth-container').addClass('d-none');
    $('#user-circle').removeClass('d-none');
    closeModal();
    showAlertModal('Welcome to the Royal Court!');
  } else {
    showAlertModal('Please enter both email and password.');
  }
}

function register() {
  const username = $('#registerUsername').val();
  const email = $('#registerEmail').val();
  const password = $('#registerPassword').val();
  if (username && email && password) {
    localStorage.setItem('userState', JSON.stringify({
      isLoggedIn: true,
      username: username,
      email: email,
      coins: 10000
    }));
    $('#user-name').text(username);
    $('#user-details').text(`Name: ${username}\nEmail: ${email}\nCoins: 10000`);
    $('#auth-container').addClass('d-none');
    $('#user-circle').removeClass('d-none');
    closeModal();
    showAlertModal('Welcome, new noble! Your 10,000 coins await.');
  } else {
    showAlertModal('Please fill in all fields.');
  }
}

function logout() {
  localStorage.removeItem('userState');
  $('#user-name').text('');
  $('#user-details').text('');
  $('#auth-container').removeClass('d-none');
  $('#user-circle').addClass('d-none').removeClass('show');
  showAlertModal('You have left the Royal Court.');
}

function restoreUserState() {
  const userState = JSON.parse(localStorage.getItem('userState'));
  if (userState && userState.isLoggedIn) {
    $('#user-name').text(userState.username);
    $('#user-details').text(`Name: ${userState.username}\nEmail: ${userState.email}\nCoins: ${userState.coins}`);
    $('#auth-container').addClass('d-none');
    $('#user-circle').removeClass('d-none');
  } else {
    $('#user-name').text('');
    $('#user-details').text('');
    $('#auth-container').removeClass('d-none');
    $('#user-circle').addClass('d-none').removeClass('show');
  }
}

function playGame(url, title) {
  const userState = JSON.parse(localStorage.getItem('userState'));
  if (!userState || !userState.isLoggedIn) {
    showAlertModal('Please register or log in to play.');
    showAuthModal();
    return;
  }
  $('#gameModalTitle').text(title);
  $('#gameFrame').attr('src', url);
  $('#gameModal').fadeIn(300);
  $('.overlay').addClass('active');
}

function closeGameModal() {
  $('#gameModal').fadeOut(300);
  $('.overlay').removeClass('active');
  $('#gameFrame').attr('src', '');
}

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  $('#cookiePopup').fadeOut(300);
}

function declineCookies() {
  localStorage.setItem('cookieConsent', 'declined');
  $('#cookiePopup').fadeOut(300);
}

$(document).ready(function() {
  restoreUserState();
  $('.top-investor-slider').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
  $('.testimonial-slider').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
  $('#user-circle').click(function() {
    $(this).toggleClass('show');
  });
  $('.faq-item__title').click(function() {
    const $parent = $(this).parent();
    const isActive = $parent.hasClass('active');
    
    // Close all other FAQ items
    $('.faq-item').removeClass('active').attr('aria-expanded', 'false');
    $('.faq-item__content').slideUp(300);
    
    // Toggle the clicked item
    if (!isActive) {
      $parent.addClass('active').attr('aria-expanded', 'true');
      $parent.find('.faq-item__content').slideDown(300);
    }
  });
  if (!localStorage.getItem('cookieConsent')) {
    $('#cookiePopup').fadeIn(300);
  }
});