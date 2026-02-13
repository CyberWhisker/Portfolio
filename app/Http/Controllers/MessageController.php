<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        return Inertia('messages/index');
    }

    public function show($id)
    {
        return Inertia('messages/show', ['id' => $id]);
    }

    public function create()
    {
        return Inertia('messages/create');
    }
}
