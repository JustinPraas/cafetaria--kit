import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { sequenceOrder } from 'src/app/utils';

interface ReorderableElement {
    id: number;
    name: string;
    sequenceOrder?: number;
}

@Component({
    selector: 'app-reorder-modal',
    templateUrl: './reorder-modal.component.html',
    styleUrls: ['./reorder-modal.component.scss'],
})
export class ReorderModalComponent implements OnInit {

    changed: boolean = false;

    @Input()
    elements: ReorderableElement[] = []

    @Input()
    onApplySequenceInvoke?: (reorderEntitiesDto: ReorderEntitiesDto) => void

    constructor() {}

    ngOnInit(): void {}

    getSortedElements() {
        return this.elements.sort(sequenceOrder);
    }

    setElements(elements: ReorderableElement[]) {
        this.elements = elements
    }

    closeModal() {
        //@ts-ignore
        jQuery('#reorder-modal').modal('hide');
    }

    onApplySequence() {
        let reorderEntitiesDto: ReorderEntitiesDto = {
            idToSequenceOrderMap: {}
        }

         this.elements.forEach(re => reorderEntitiesDto.idToSequenceOrderMap[re.id] = re.sequenceOrder!)

        if (this.onApplySequenceInvoke) {
            this.onApplySequenceInvoke(reorderEntitiesDto)
        } else {
            console.log("Kon niet invoken")
        }

    }

    drop(event: CdkDragDrop<string[]>) {
        this.changed = true;
        updateIndex(this.getSortedElements(), event.previousIndex, event.currentIndex);
    }
}

function updateIndex(elements: ReorderableElement[], previousIndex: number, currentIndex: number) {
    const draggedElement = elements[previousIndex]

    elements.splice(previousIndex, 1)
    elements.splice(currentIndex, 0, draggedElement)

    for (let i = 0; i < elements.length; i++) {
        elements[i].sequenceOrder = i + 1;
    }
}

