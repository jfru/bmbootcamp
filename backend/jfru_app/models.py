from django.db import models

# Create your models here.
class Blessing(models.Model):
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class BlessingWord(models.Model):
    blessing = models.ForeignKey(Blessing, on_delete=models.CASCADE, related_name='words')
    text = models.CharField(max_length=100)
    audio = models.FileField(upload_to='blessings/audio/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.text

class Torah(models.Model):
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class TorahVerse(models.Model):
    torah = models.ForeignKey(Torah, on_delete=models.CASCADE, related_name='verses')
    reference = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.reference

class TorahPhrase(models.Model):
    verse = models.ForeignKey(TorahVerse, on_delete=models.CASCADE, related_name='phrases')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.verse.reference} - Phrase"

class TorahWord(models.Model):
    phrase = models.ForeignKey(TorahPhrase, on_delete=models.CASCADE, related_name='words')
    text = models.CharField(max_length=100)
    english_text = models.CharField(max_length=100, null=True, blank=True)
    audio = models.FileField(upload_to='torah/word_audio/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.text
