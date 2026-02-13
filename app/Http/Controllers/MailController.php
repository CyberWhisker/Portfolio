<?php

namespace App\Http\Controllers;

use App\Models\Mail;
use Illuminate\Http\Request;

class MailController extends Controller
{
    public function index()
    {
        $mails = Mail::all()->map( function ($item) {

            $item->time = $item->created_at->diffForHumans();
            $item->starred = false;
            $item->tag = $item->read ? 'Read' : 'Unread';
            return $item;
        });
        return Inertia('mail/index', [
            'mails' => $mails
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        Mail::create([
            'email' => $request->email,
            'subject' => $request->subject,
            'message' => $request->message,
        ]);

        return redirect()->back()->with('success', 'Message sent successfully.');
    }

    function destroy(Request $request, $id)
    {
        $mail = Mail::findOrFail($id);
        $mail->delete();


        return redirect()->back()->with('success', 'Message deleted successfully.');
    }
}
