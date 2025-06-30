import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-monaco-editor',
  standalone: true,
  template: `<div #editorContainer style="height:300px;width:100%;border:1px solid #ccc;"></div>`
})
export class MonacoEditor implements AfterViewInit {
  @Input() language = 'javascript';
  @Input() code = '';
  @Output() codeChange = new EventEmitter<string>();
  @ViewChild('editorContainer') editorContainer!: ElementRef;

  private editorInstance!: monaco.editor.IStandaloneCodeEditor;

  ngAfterViewInit() {
    this.editorInstance = monaco.editor.create(this.editorContainer.nativeElement, {
      value: this.code || '',
      language: this.language,
      theme: 'vs-dark',
      automaticLayout: true
    });

    this.editorInstance.onDidChangeModelContent(() => {
      this.codeChange.emit(this.editorInstance.getValue());
    });

    setTimeout(() => this.editorInstance.layout(), 0);

    if (this.code) {
      this.editorInstance.setValue(this.code);
    }
    window.addEventListener('resize', () => this.editorInstance.layout());
}

}
