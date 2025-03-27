import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Task {
  id?: string;
  name: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  firestore: Firestore = inject(Firestore);
  tasks$: Observable<Task[]>;
  newTask: string = '';

  constructor() {
    const tasksCollection = collection(this.firestore, 'tasks');
    this.tasks$ = collectionData(tasksCollection, {
      idField: 'id',
    }) as Observable<Task[]>;
  }

  async addTask() {
    if (this.newTask.trim()) {
      const tasksCollection = collection(this.firestore, 'tasks');
      await addDoc(tasksCollection, { name: this.newTask, completed: false });
      this.newTask = '';
    }
  }

  async toggleTask(task: Task) {
    const taskDoc = doc(this.firestore, 'tasks', task.id!);
    await updateDoc(taskDoc, { completed: !task.completed });
  }

  async removeTask(task: Task) {
    const taskDoc = doc(this.firestore, 'tasks', task.id!);
    await deleteDoc(taskDoc);
  }
}
