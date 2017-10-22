# CamBank
Internet banking per il progetto UNICAM di programmazione web.

## Testo del progetto

#### User story obbligatorie
- come utente voglio poter accedere ad un’area privata tramite username e password
- come utente voglio poter leggere i miei movimenti bancari
- come utente voglio poter stampare un report dei miei movimenti bancari
- come utente voglio poter effettuare un bonifico
- come utente voglio poter avere un grafico che mi illustra in maniera sintetica la mia situazione in banca

#### User story obbligatorie
- come visitatore (utente non loggato) voglio poter aprire un conto corrente
- come visitatore e/o come utente voglio poter informarmi sulle prinicipali valute
- come utente voglio poter scaricare un pdf del dettaglio dei miei movimenti
- come utente voglio poter visualizzare le informazioni del mio account e modificare il mio username
- come utente voglio poter effettuare ricariche telefoniche e pagare mav
- come utente voglio poter gestire una rubrica di contatti
  - come utente voglio poter scegliere da questa rubrica il destinatario di un bonifico

## Link
App deployata su heroku: https://cambank.herokuapp.com

## Deploy
Per effettuare il deploy in locale è sufficiente eseguire pochi comandi:
  >git clone https://github.com/MaxUnicam/CamBank.git <br />
  >cd Cambank/src <br />
  >npm install <br />
  >npm start

Nota: per scelta sia l'app in produzione su Heroku che il progetto deployato in locale fanno riferimento alla stessa istanza di mongodb.

## Utenti
Alcuni utenti con cui effettuare il login per avere una situazione già "operativa" (quindi con dei dati):
username: max
password: pwd

username: Microsoft It.
password: microsoft

## Descrizione struttura
La struttura del repository è piuttosto semplice, nella root abbiamo il Readme, il .gitignore ed una cartella src che contiene tutti i sorgenti del progetto. 
Aprendo quest'ultima troviamo la struttura di un progetto Angular (2 o più) generata dalla angular cli, un file index.js che è l'entry point del progetto ed un'altra cartella API che invece contiene tutta la logica del server API in Node 

## Gruppo
Progetto realizzato da Massimiliano Sampaolo [Matricola 095573]
