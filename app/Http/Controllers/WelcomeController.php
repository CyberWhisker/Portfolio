<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use App\Models\Project;
use App\Models\Technologies;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $experience = Experience::all();
        return Inertia::render("welcome/index", [
            'statData' => $this->statData(),
            'skillDatas' => $this->technologiesData(),
            'experienceData' => $experience->map(function ($job) {
                return [
                    'title' => $job->title,
                    'company' => $job->company,
                    'status' => Carbon::parse($job->end_date)->isFuture() ? 'Current' : 'Past',
                    'start_date' => Carbon::parse($job->start_date)->format('M Y'),
                    'end_date' => Carbon::parse($job->end_date)->format('M Y'),
                ];
            })
        ]);
    }

    function statData()
    {
        $experience = Experience::all();
        $yearsOfExperience = $experience->sum(function ($jobs) {
            $startData = Carbon::parse($jobs->start_date);
            $endData = Carbon::parse($jobs->end_date);
            return $startData->diffInYears($endData);
        });
        $projectsData = Project::all()->count();

        $contractsData = $experience->count();

        return [
            [
                'label' => 'Years of Experience',
                'value' => floor($yearsOfExperience),
                'suffix' => '+'
            ],
            [
                'label' => 'Projects Completed',
                'value' => $projectsData,
                'suffix' => ''
            ],
            [
                'label' => 'Contracts Signed',
                'value' => $contractsData,
                'suffix' => ''
            ]
        ];
    }

    function technologiesData()
    {
        $technologies = Technologies::all();

        $labelIcons = [
            'Frontend' => 'Code2',
            'Backend' => 'Database',
            'DevOps' => 'Cloud',
            'Design' => 'Palette',
        ];

        return $technologies->groupBy('tag')->map(function ($techGroup, $tag) use ($labelIcons) {
            return [
                'label' => $tag,
                'icon' => Arr::get($labelIcons, $tag, 'DefaultIcon'), // use mapped icon, fallback to DefaultIcon
                'items' => $techGroup->pluck('name')->toArray(),
            ];
        })->values();
    }
}
