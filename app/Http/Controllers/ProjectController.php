<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all();
        return Inertia::render('projects/index', [
            'projects' => $projects
        ]);
    }   
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'url' => 'nullable|url',
        ]);

        Project::create($validated);

        return redirect()->route('projects.index');
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:projects,id',
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'url' => 'sometimes|url',
        ]);

        $project = Project::findOrFail($validated['id']);
        $project->update($validated);

        return redirect()->route('projects.index');
    }

    public function destroy(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:projects,id',
        ]);

        Project::destroy($validated['id']);
        return redirect()->route('projects.index');
    }
}
