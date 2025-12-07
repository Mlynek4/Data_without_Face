# [('A', 'B-NAME'), ('la', 'I-NAME'), ('idzie', 'O')]
# Odtworzony tekst: [Name] idzie
from typing import List, Tuple
import re

def create_template(tokens_with_tags: List[Tuple[str, str]]) -> str:
    """
    Rekonstruuje szablon tekstu, zastępując tokeny należące do encji (tagi IOB)
    nazwami ich kategorii w nawiasach kwadratowych ([KATEGORIA]).

    Argumenty:
        tokens_with_tags: Lista krotek w formacie [(token, tag IOB), ...].

    Zwraca:
        Zrekonstruowany szablon z wstawionymi nazwami kategorii.
    """
    
    # Mapowanie skrótów tagów IOB na pełne nazwy kategorii (zmienione, by pasowały
    # do formatu zadanego przez użytkownika: [NAME], [SURNAME], etc.)
    TAG_TO_CATEGORY_MAP = {
        "NAME": "NAME", "SURNAME": "SURNAME", "AGE": "AGE", "DATE-OF-BIRTH": "DATE-OF-BIRTH",
        "DATE": "DATE", "SEX": "SEX", "RELIGION": "RELIGION", "POLITICAL-VIEW": "POLITICAL-VIEW",
        "ETHNICITY": "ETHNICITY", "SEXUAL-ORIENTATION": "SEXUAL-ORIENTATION", "HEALTH": "HEALTH",
        "RELATIVE": "RELATIVE", "CITY": "CITY", "ADDRESS": "ADDRESS", "EMAIL": "EMAIL",
        "PHONE": "PHONE", "PESEL": "PESEL", "DOCUMENT-NUMBER": "DOCUMENT-NUMBER",
        "COMPANY": "COMPANY", "SCHOOL-NAME": "SCHOOL-NAME", "JOB-TITLE": "JOB-TITLE",
        "BANK-ACCOUNT": "BANK-ACCOUNT", "CREDIT-CARD-NUMBER": "CREDIT-CARD-NUMBER",
        "USERNAME": "USERNAME", "SECRET": "SECRET"
    }

    template_parts = []
    i = 0
    
    while i < len(tokens_with_tags):
        token, tag = tokens_with_tags[i]
        
        # 1. Obsługa Taga 'O' (Outside / Poza Encją)
        if tag == 'O':
            is_punctuation = token in ('.', ',', '!', '?', ':', ';', ')', ']', '}')
            
            if template_parts:
                last_part = template_parts[-1]
                
                # Dodaj spację, chyba że bieżący token jest interpunkcją lub 
                # jest bezpośrednio po innym placeholderze/otwierającym symbolu
                if not is_punctuation and not last_part.endswith(' '):
                    if not (last_part.startswith('[') and last_part.endswith(']')):
                        template_parts.append(' ')
                    
                # Jeśli bieżący token jest interpunkcją, usuń potencjalnie dodaną spację
                elif is_punctuation and template_parts[-1] == ' ':
                    template_parts.pop()

            template_parts.append(token)
            i += 1
            
        # 2. Obsługa Tagów 'B-' (Beginning / Początek Encji)
        elif tag.startswith('B-'):
            category_tag = tag[2:]
            category_name = TAG_TO_CATEGORY_MAP.get(category_tag, category_tag)
            placeholder = f"[{category_name}]"
            
            # Wstaw spację przed placeholderem, jeśli nie jesteśmy na początku tekstu
            # i poprzedni element nie kończył się spacją (lub nie był już placeholderem)
            if template_parts and not template_parts[-1].endswith(' '):
                template_parts.append(' ')
                
            template_parts.append(placeholder)
            
            # Przeskocz wszystkie kolejne tokeny z tagiem 'I-' (Inside)
            i += 1
            while i < len(tokens_with_tags) and tokens_with_tags[i][1].startswith('I-'):
                i += 1
        else:
            # Pomiń nieprawidłowe tokeny 'I-' (które nie mają poprzedzającego B-)
            i += 1
            
    # Na koniec łączymy listę części i usuwamy nadmiarowe spacje (np. podwójne)
    text = "".join(template_parts).strip()
    return re.sub(r'\s+', ' ', text)
