<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index()
    {
        $experience = Experience::all();
        return Inertia::render('experience/index', [
            'experiences' => $experience
        ]);
    }   
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        Experience::create($validated);

        return redirect()->route('experiences.index');
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:experiences,id',
            'title' => 'sometimes|string|max:255',
            'company' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after:start_date',
        ]);

        $experience = Experience::findOrFail($validated['id']);
        $experience->update($validated);

        return redirect()->route('experiences.index');
    }

    public function destroy(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:experiences,id',
        ]);

        Experience::destroy($validated['id']);

        return redirect()->route('experiences.index');
    }
}
