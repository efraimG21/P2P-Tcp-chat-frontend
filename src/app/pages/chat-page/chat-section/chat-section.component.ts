import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {MessageInterface} from "../../../interfaces/message-interface";

@Component({
  selector: 'app-chat-section',
  templateUrl: './chat-section.component.html',
  styleUrl: './chat-section.component.scss'
})
export class ChatSectionComponent {
  messageForm: FormGroup;
  messageInput = new FormControl('', [Validators.required, Validators.min(1)]);
  filesInput = new FormControl([], [Validators.required]);

  messageList = new BehaviorSubject<MessageInterface[]>([]);

  constructor(private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      messageInput: this.messageInput,
      filesInput: this.filesInput,
    });
  }

  sendMessage() {
    this.messageList.next([...this.messageList.getValue(), {
      senderUid: "",
      content: this.messageForm.get('messageInput')?.value,
      timeStamp: new Date(),
      status: 'Received',
    }]);

  }

}
