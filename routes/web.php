<?php

use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TechnologiesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard/index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('users')->name('users.')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('index');
});

Route::prefix('technologies')->name('technologies.')->group(function () {
    Route::get('/', [TechnologiesController::class, 'index'])->name('index');
    Route::post('/', [TechnologiesController::class, 'store'])->name('store');
    Route::patch('/{id}', [TechnologiesController::class, 'update'])->name('update');
    Route::delete('/{id}', [TechnologiesController::class, 'destroy'])->name('destroy');
});
Route::prefix('experiences')->name('experiences.')->group(function () {
    Route::get('/', [ExperienceController::class, 'index'])->name('index');
    Route::post('/', [ExperienceController::class, 'store'])->name('store');
    Route::patch('/{id}', [ExperienceController::class, 'update'])->name('update');
    Route::delete('/{id}', [ExperienceController::class, 'destroy'])->name('destroy');
});
Route::prefix('projects')->name('projects.')->group(function () {
    Route::get('/', [ProjectController::class, 'index'])->name('index');
    Route::post('/', [ProjectController::class, 'store'])->name('store');
    Route::patch('/{id}', [ProjectController::class, 'update'])->name('update');
    Route::delete('/{id}', [ProjectController::class, 'destroy'])->name('destroy');
});

require __DIR__ . '/settings.php';
