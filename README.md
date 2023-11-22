# SQL Table Generator

## Descrizione dell'applicazione
Questa è una semplice applicazione web progettata per generare il comando SQL per la creazione di una tabella con i relativi campi. È uno strumento utile per semplificare il processo di creazione di tabelle in un database SQL, eliminando la necessità di scrivere manualmente il comando SQL.

## Caratteristiche principali
- **Interfaccia utente intuitiva:** L'applicazione offre un'interfaccia utente user-friendly che guida l'utente attraverso il processo di definizione dei campi della tabella.
- **Generazione automatica del comando SQL:** Dopo aver inserito le informazioni necessarie, l'applicazione genera automaticamente il comando SQL per creare la tabella.
- **Personalizzazione dei campi:** Gli utenti possono definire il nome del campo, il tipo di dato, la lunghezza (se applicabile), e se il campo è obbligatorio o meno.
- **Copiatura facilitata:** Un pulsante "Copia" è fornito per copiare facilmente il comando SQL generato negli appunti.

## Utilizzo dell'applicazione
1. Accedere all'applicazione web.
2. Inserire il nome della tabella.
3. Aggiungere i campi desiderati specificando il nome, il tipo di dato, la lunghezza (se necessario) e se il campo è obbligatorio o meno.
4. Fare clic su "Genera SQL".
5. Il comando SQL generato apparirà nella sezione dedicata.
6. Utilizzare il pulsante "Copia" per copiare il comando SQL negli appunti.

## Esempio di comando SQL generato
```sql
CREATE TABLE nome_tabella (
    id INT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascita DATE,
    email VARCHAR(100)
);

