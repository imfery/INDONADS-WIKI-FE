declare module '*.svg' {
    import React from 'react';
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}

declare module '*.png' {
    const value: string;
    export default value;
}

declare module 'editorjs-text-alignment-blocktune' {
    import { BlockTuneConstructable } from '@editorjs/editorjs';

    const AlignmentTune: BlockTuneConstructable;
    export default AlignmentTune;
}

declare module 'editorjs-paragraph-with-alignment' {
    import { ToolConstructable } from '@editorjs/editorjs';

    const Paragraph: ToolConstructable;
    export default Paragraph;
}

declare module '@editorjs/checklist' {
    import { ToolConstructable } from '@editorjs/editorjs';

    interface ChecklistData {
        items: Array<{
            text: string;
            checked: boolean;
        }>;
    }

    interface ChecklistConfig {
        defaultStyle?: 'unordered' | 'ordered';
    }

    export default class Checklist implements ToolConstructable {
        constructor({
            data,
            config,
            api,
            readOnly,
        }: {
            data: ChecklistData;
            config: ChecklistConfig;
            api: any;
            readOnly: boolean;
        });

        static get toolbox(): { icon: string; title: string };

        render(): HTMLElement;
        save(blockContent: HTMLElement): ChecklistData;
        validate(savedData: ChecklistData): boolean;
        renderSettings(): HTMLElement;
    }
}

declare module '@editorjs/underline' {
    import { InlineToolConstructable, API } from '@editorjs/editorjs';

    interface UnderlineConfig {
        shortcut?: string; // Keyboard shortcut for the tool, e.g., "CMD+U"
    }

    export default class Underline implements InlineToolConstructable {
        constructor({ api, config }: { api: API; config?: UnderlineConfig });

        static get isInline(): boolean;

        static get sanitize(): { u: unknown };

        static get shortcut(): string;

        render(): HTMLElement;

        surround(range: Range): void;

        checkState(): void;
    }
}

declare module '@editorjs/marker' {
    import { InlineToolConstructable, API } from '@editorjs/editorjs';

    interface MarkerConfig {
        shortcut?: string; // Keyboard shortcut for the tool, e.g., "CMD+M"
    }

    export default class Marker implements InlineToolConstructable {
        constructor({ api, config }: { api: API; config?: MarkerConfig });

        static get isInline(): boolean;

        static get sanitize(): { mark: unknown };

        static get shortcut(): string;

        render(): HTMLElement;

        surround(range: Range): void;

        checkState(): void;
    }
}

declare module '@bomdi/codebox' {
    import {
        BlockToolConstructable,
        API,
        BlockToolData,
    } from '@editorjs/editorjs';

    interface CodeBoxConfig {
        placeholder?: string; // Optional: Placeholder text for the code block
        theme?: 'light' | 'dark'; // Optional: Theme for the code block
        readOnly?: boolean; // Optional: Read-only mode
    }

    interface CodeBoxData extends BlockToolData {
        code: string; // The actual code content stored in the block
        language: string; // Programming language of the code
    }

    export default class CodeBox implements BlockToolConstructable {
        constructor({
            data,
            config,
            api,
            readOnly,
        }: {
            data: CodeBoxData;
            config?: CodeBoxConfig;
            api: API;
            readOnly: boolean;
        });

        static get toolbox(): { icon: string; title: string };

        render(): HTMLElement;

        save(blockContent: HTMLElement): CodeBoxData;

        validate(savedData: CodeBoxData): boolean;
    }
}

declare module '@editorjs/warning' {
    import {
        BlockToolConstructable,
        API,
        BlockToolData,
    } from '@editorjs/editorjs';

    interface WarningConfig {
        titlePlaceholder?: string;
        messagePlaceholder?: string;
    }

    interface WarningData extends BlockToolData {
        title: string;
        message: string;
    }

    export default class Warning implements BlockToolConstructable {
        constructor({
            data,
            config,
            api,
            readOnly,
        }: {
            data: WarningData;
            config?: WarningConfig;
            api: API;
            readOnly: boolean;
        });

        static get toolbox(): { icon: string; title: string };

        render(): HTMLElement;

        save(blockContent: HTMLElement): WarningData;

        validate(savedData: WarningData): boolean;
    }
}

declare module 'editorjs-inline-spoiler-tool' {
    import { InlineToolConstructable, API } from '@editorjs/editorjs';

    export default class TextSpoiler implements InlineToolConstructable {
        constructor({
            api,
            config,
        }: {
            api: API;
            config?: any; // Adjust if there are specific configurations
        });

        static get isInline(): boolean;

        static get sanitize(): { span: { class: string } };

        render(): HTMLElement;

        surround(range: Range): void;

        checkState(): void;
    }
}

declare module '@editorjs/text-variant-tune' {
    import { BlockTuneConstructable, API } from '@editorjs/editorjs';

    export default class TextVariantTune implements BlockTuneConstructable {
        constructor({ api }: { api: API });

        render(): HTMLElement;

        wrap(blockContent: HTMLElement): HTMLElement;

        save(): any;
    }
}

declare module 'editorjs-drag-drop' {
    import { EditorJS } from '@editorjs/editorjs';

    interface DragDropConfig {
        handleClass?: string;
    }

    export default class DragDrop {
        constructor(editor: EditorJS, config?: DragDropConfig);
    }
}

declare module 'editorjs-undo' {
    import { EditorJS } from '@editorjs/editorjs';

    interface UndoConfig {
        shortcut?: boolean;
    }

    export default class Undo {
        constructor(editor: EditorJS, config?: UndoConfig);
    }
}
