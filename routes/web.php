<?php

use App\Http\Controllers\Front\FrontendController;
use Illuminate\Support\Facades\Route;

Route::middleware(['maintenance'])->group(function () {
    // ********************************* FRONTEND SECTION *******************************************//
    Route::get('/',                               [FrontendController::class, 'index'])->name('front.index');
    Route::get('/about',                          [FrontendController::class, 'about'])->name('about');
    // Route::get('/frequently-asked-questions',     [FrontendController::class, 'faq'])->name('faq');
    Route::get('/contact',                        [FrontendController::class, 'contact'])->name('contact');

    Route::post('/contact',                       [FrontendController::class, 'contactSubmit']);

    Route::get('/terms',                          [FrontendController::class, 'terms'])->name('terms');

    Route::get('/privacy',                          [FrontendController::class, 'privacy'])->name('privacy');

    Route::get('/crypto',                          [FrontendController::class, 'assets'])->name('assets');

    Route::get('/change-language/{code}',         [FrontendController::class,'langChange'])->name('lang.change');

});


Route::get('/maintenance',       [FrontendController::class, 'maintenance'])->name('front.maintenance');


require __DIR__ . '/auth.php';
