from django.shortcuts import render
from django.http import JsonResponse
from .models import *

# Create your views here.
def blessing(request):
    """
    Render the index page.
    """
    return JsonResponse({'status': 'success'}, safe=False)

def torah(request, verse_id=None):
    try:
        verse = TorahVerse.objects.get(id=verse_id)
    except TorahVerse.DoesNotExist:
        verse = TorahVerse.objects.first()

    data = {
        "reference": verse.reference,
        "phrases": []
    }

    for phrase in verse.phrases.all():
        phrase_data = {
            "order": phrase.id,  # or use 'order' if you kept it
            "words": []
        }
        for word in phrase.words.all():
            phrase_data["words"].append({
                "text": word.text,
                "audio": word.audio.url,
                "english_text": word.english_text if word.english_text else None
            })
        data["phrases"].append(phrase_data)
    
    print(data)

    return JsonResponse(data)