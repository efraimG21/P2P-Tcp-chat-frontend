import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {MessageInterface} from "../../../interfaces/message-interface";
import {ChatHandlingService} from "../../../services/chat/chat-handling.service";

@Component({
  selector: 'app-chat-section',
  templateUrl: './chat-section.component.html',
  styleUrl: './chat-section.component.scss'
})
export class ChatSectionComponent {
  messageForm: FormGroup;
  messageInput = new FormControl('', [Validators.required, Validators.min(1)]);
  filesInput = new FormControl([], [Validators.required]);

  messageList$ = new BehaviorSubject<MessageInterface[] | null>(null);

  constructor(private formBuilder: FormBuilder, private chatHandlingService: ChatHandlingService) {
    this.messageForm = this.formBuilder.group({
      messageInput: this.messageInput,
      filesInput: this.filesInput,
    });
    this.chatHandlingService.messages$.subscribe(value => {
      this.messageList$.next(value);
    })

    this.messageList$.subscribe(value => {
      console.log(value)
    })
  }

  sendMessage() {
    if (this.messageList$.value) {
      this.messageList$.next([...this.messageList$.value, {
        senderUid: "",
        content: this.messageForm.get('messageInput')?.value,
        timeStamp: new Date(),
        status: 'Read',
      }]);
    }
  }
}
