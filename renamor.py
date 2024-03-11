import os
import tkinter as tk
import time
from tkinter import filedialog

def rename_files(directory):
    video_extensions = (".mp4", ".avi", ".mov")
    for filename in os.listdir(directory):
        file_extension = os.path.splitext(filename)[1].lower()
        if file_extension in video_extensions:
            old_path = os.path.join(directory, filename)
            creation_date = os.path.getctime(old_path)
            formatted_date = time.strftime('%Y-%m-%d', time.localtime(creation_date))
            new_filename = f"{formatted_date}-{filename}"
            new_path = os.path.join(directory, new_filename)
            os.rename(old_path, new_path)

def select_directory():
    directory = filedialog.askdirectory()
    if directory:
        rename_files(directory)
        tk.messagebox.showinfo("Terminé", "Renommage des fichiers vidéo terminé.")

root = tk.Tk()
root.title("Renommer les fichiers vidéo")

label = tk.Label(root, text="Sélectionnez le répertoire contenant les fichiers vidéo à renommer:")
label.pack(pady=10)

button = tk.Button(root, text="Sélectionner le répertoire", command=select_directory)
button.pack(pady=5)

root.mainloop()
