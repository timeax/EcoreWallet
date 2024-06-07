<?php

use App\Http\Controllers\Front\FrontendController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('currency-rate', [FrontendController::class, 'currencyRate'])->name('currency.rate');
Route::middleware(['maintenance'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    })->name('front.index');;

    // ********************************* FRONTEND SECTION *******************************************//
    // Route::get('/',                               [FrontendController::class, 'index'])->name('front.index');
    Route::get('/about',                          [FrontendController::class, 'about'])->name('about');
    Route::get('/frequently-asked-questions',     [FrontendController::class, 'faq'])->name('faq');
    Route::get('/contact',                        [FrontendController::class, 'contact'])->name('contact');
    Route::post('/contact',                       [FrontendController::class, 'contactSubmit']);
    Route::get('/blogs',                          [FrontendController::class, 'blogs'])->name('blogs');
    Route::get('/offer-lists',                    [FrontendController::class, 'offerList'])->name('offer.list');
    Route::get('/blog-details/{id}-{slug}',       [FrontendController::class, 'blogDetails'])->name('blog.details');
    Route::get('/terms-and-policies/{key}-{slug}', [FrontendController::class, 'terms_policies'])->name('terms.details');
    Route::get('/pages/{id}-{slug}',              [FrontendController::class, 'pages'])->name('pages');
    Route::get('/change-language/{code}',         [FrontendController::class, 'langChange'])->name('lang.change');
});
Route::get('cookie-deny',                  [FrontendController::class, 'cookieDeny'])->name('cookie.deny');
Route::post('the/genius/ocean/2441139', [FrontendController::class, 'subscription']);
Route::get('finalize',                  [FrontendController::class, 'finalize']);

Route::get('/maintenance',       [FrontendController::class, 'maintenance'])->name('front.maintenance');


require __DIR__ . '/auth.php';
