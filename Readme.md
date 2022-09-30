# Vorlage für MME-Projekte

Dieses Repository bildet die Grundlage für Ihre Projektarbeit und wurde über die Annahme der _Classroom_-Aufgabe automatisch erstellt. Hinweise zum Aufbau der vorgegebenen Struktur und Hilfswerkzeuge finden Sie im [Dev Guide](./DevGuide.md). **Achten Sie während der Entwicklung stets darauf, dass der Code in Ihrem Repository zu jeder Zeit über `npm run build` fehlerfrei gebaut und veröffentlicht werden kann.**

**Ergänzen Sie im Laufe der Entwicklung die folgenden Punkte in dieser Readme-Datei!**

## Projekt

### SmartFinance

_Fassen Sie kurz die wichtigsten Features, die intendierte Zielgruppe und die grundlegende Motivation des Projekts zusammen. Nennen Sie die aktuell bereits implementierten Funktionen und verlinken Sie den aktuellsten Release._
SmartFinance ist eine Web-Anwendung, die sich vor allem an junge Erwachsene (z.B. Studierende) richtet, welche noch nicht sehr erfahren mit Finanzen sind.
Ziel des Projekts soll sein, dass man seine Ein- und Ausgaben im Überblick hat und es den Usern somit leichter fällt, die gewünschten Sparziele zu erreichen.

Implementierte Funktionen:
 - Man kann sich ein Sparziel setzen und dieses bearbeiten
 - Man kann ein Startguthaben festlegen
 - Man kann Ein- und Ausgaben verwalten
 - Man kann Ausgaben für andere Personen markieren
 - Man kann bei Ein- und Ausgaben einstellen, dass diese monatlich stattfinden
 - Man kann Ein- und Ausgaben verschiedenen Kategirien zuordnen
 - Man hat auf der Startseite einen Überblick über die Ein- und Ausgaben
 - Man kann sich einen Account erstellen
 - Die eingegebenen Daten der Nutzer*innen sind beim nächsten Login wieder verfügbar


## Beschreibung & Anleitung

_Beschreiben Sie die zentralen Funktionen Ihrer Anwendung und deren Verwendung. Nutzen Sie dazu Screenshots und/oder Videos. Verlinken Sie ein min. 60-sekündiges Demo-Video, das die Verwendung aller wichtigen Funktionen zeigt und in Form eines Audio-Kommentars beschreibt._

Beim Aufruf der Website kann man sich mit seinem Account einloggen oder sich neu registrieren.

![Login-Screen](/readme_resources/Login.PNG "Login")

Auf der Startseite bekommt man einen überblick über die Ein- und Ausgaben

![Main-Page](/readme_resources/Main_page.PNG "Startseite")

Mit dem "+"-Button im Bereich "Letzte Transaktionen" lassen sich neue Ein- und Ausgaben hinzufügen.

Einnahme sollten zur Kategorie "Einnahmen" hinzugefügt werden.

Sollte man Geld, welches man sparen möchte, beiseite gelegt haben, kann man diese Ausgabe zur Kategorie "sparen" hinzufügen. Die Sparziel-Anzeige gibt daraufhin an, wie nah man seinem Sparziel bereits gekommen ist.

Ein- und Ausgaben, welche monatlich stattfinden (z.B. Gehalt, Abonnement, etc.) können mit dem Reiter "wiederholen" als solche gekennzeichnet werden.

Sollte man Geld für eine Andere Person Ausgegeben haben, kann man diese Person in der Ausgabe vermerken.

![Neue_Transaktion](/readme_resources/Neuer_Eintrag.PNG "Neuer Eintrag")

Mit dem "Verwalten"-Button im Bereich "Letzte Transaktionen" auf der Hauptseite kommt man in das Verwaltungsmenü. Man kann dort Eintrage bearbeiten, löschen und neu erstellen. Ebenso können Ein- und Ausgaben nach dem Monat gefiltert werden.

![Verwalte_Transaktionen](/readme_resources/Finanzen_Verwalten.PNG "Verwalte Transaktionen")

Sein Sparziel kann man ändern, indem man im Bereich "Sparziel" auf der Hauptseite auf "ändern" klickt, oder in der Sidebar das dritte Icon von oben anklickt. Nachdem man das neue Spärziel eingegeben hat, bestätigt man es mit dem "OK"-Button

![Neues_Sparziel](/readme_resources/Sparziel_Anpassen.PNG "Verwalte Transaktionen")

Mit dem vierten Button von oben in der Sidebar gelangt man zu den Nutzereinstellungen.

Hier kann man ein Startguthaben einstellen, falls man zu Anfang bereits Geld hat.

Ebenso lassen sich Email und Passwort ändern.

Möchte man alle Transaktionen löschen, kann man das hier tun.

Hier gibt es auch die Möglichkeit, sich auszuloggen.

![Optionen](/readme_resources/Optionen.PNG "Optionen")

###Demo Video

[Demo](/readme_resources/Demo.mp4 "Optionen")

## Team

|Name|Email|
|----|-----|
|Deniz Olucak|Deniz-Melih.Olucak@stud.uni-regensburg.de|
|Tobias Tepfenhart|Tobias.Tepfenhart@stud.uni-regensburg.de|
|Tobias Vocht|Tobias.Vocht@stud.uni-regensburg.de|
|Tobias Wittl|Tobias.Wittl@stud.uni-regensburg.de|

Das Projekt wurde hauptsächlich in gemeinsamen Discord-Sitzungen bearbeitet.