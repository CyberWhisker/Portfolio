<?php

namespace App\Http\Controllers;

use App\Models\Technologies;
use Illuminate\Http\Request;

class TechnologiesController extends Controller
{
    public function index()
    {
        $technologies = Technologies::all();
        return inertia('technologies/index', [
            'technologies' => $technologies,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'tag' => 'required',
        ]);

        Technologies::create($validated);

        return redirect()->route('technologies.index');
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:technologies,id',
            'name' => 'sometimes|string|max:255',
            'tag' => 'sometimes',
        ]);

        $technology = Technologies::findOrFail($validated['id']);
        $technology->update($validated);

        return redirect()->route('technologies.index');
    }

    public function destroy(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:technologies,id',
        ]);

        Technologies::destroy($validated['id']);

        return redirect()->route('technologies.index');
    }
}