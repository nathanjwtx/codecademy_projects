$(document).ready(() => {
    let $cart = $('#cart');
    let $cartMenu = $('#cartMenu');
    let $account = $('#account');
    let $accountMenu = $('#accountMenu');
    let $help = $('#help');
    let $helpMenu = $('#helpMenu');
    $cart.on('click', () => {
      $cartMenu.show();
    });
    $cart.on('mouseleave', () => {
      $cartMenu.hide();
    });
    $account.on('click', () => {
      $accountMenu.show();
    });
    $account.on('mouseleave', () => {
      $accountMenu.hide();
    });
    $help.on('click', () => {
      $helpMenu.show();
    });
    $help.on('mouseleave', () => {
      $helpMenu.hide();
    });
  });