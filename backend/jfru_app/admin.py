from django.contrib import admin
import nested_admin

from .models import (
    Blessing, BlessingWord,
    Torah, TorahVerse, TorahPhrase, TorahWord
)

# -- Blessing setup --

class BlessingWordInline(admin.TabularInline):
    model = BlessingWord
    extra = 1

@admin.register(Blessing)
class BlessingAdmin(admin.ModelAdmin):
    inlines = [BlessingWordInline]


# -- Torah setup (Deeply Nested) --

class TorahWordInline(nested_admin.NestedTabularInline):
    model = TorahWord
    extra = 1

class TorahPhraseInline(nested_admin.NestedTabularInline):
    model = TorahPhrase
    inlines = [TorahWordInline]
    extra = 1

class TorahVerseInline(nested_admin.NestedTabularInline):
    model = TorahVerse
    inlines = [TorahPhraseInline]
    extra = 1

@admin.register(Torah)
class TorahAdmin(nested_admin.NestedModelAdmin):
    inlines = [TorahVerseInline]
