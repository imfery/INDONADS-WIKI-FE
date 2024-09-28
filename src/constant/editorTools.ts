import type {
    BlockToolConstructable,
    BlockTuneConstructable,
    InlineToolConstructable,
    ToolConstructable,
    ToolSettings,
} from '@editorjs/editorjs';

import { uploadImage } from '@/app/utils/api';

export const loadEditorTools = async (): Promise<{
    [toolName: string]: ToolConstructable | ToolSettings;
}> => {
    if (typeof window === 'undefined') {
        return {};
    }

    const Header = (await import('@editorjs/header')).default;
    const Quote = (await import('@editorjs/quote')).default;
    const NestedList = (await import('@editorjs/nested-list')).default;
    const Checklist = (await import('@editorjs/checklist')).default;
    const Image = (await import('@editorjs/image')).default;
    const Table = (await import('@editorjs/table')).default;
    const Marker = (await import('@editorjs/marker')).default;
    const Underline = (await import('@editorjs/underline')).default;
    const AlignmentTune = (await import('editorjs-text-alignment-blocktune'))
        .default;
    const Paragraph = (await import('editorjs-paragraph-with-alignment'))
        .default;
    const Warning = (await import('@editorjs/warning')).default;
    const TextVariantTune = (await import('@editorjs/text-variant-tune'))
        .default;
    const Delimiter = (await import('@coolbytes/editorjs-delimiter')).default;
    const Embed = (await import('@editorjs/embed')).default;

    return {
        alignment: AlignmentTune as unknown as BlockTuneConstructable,
        header: {
            class: Header as unknown as ToolConstructable,
            inlineToolbar: ['link'],
            config: {
                placeholder: 'Enter a header',
                levels: [1, 2, 3, 4, 5],
                defaultLevel: 1,
            },
            tunes: ['alignment'],
        },
        textVariant: TextVariantTune as unknown as ToolConstructable,
        paragraph: {
            class: Paragraph as unknown as ToolConstructable,
            inlineToolbar: true,
            tunes: ['textVariant'],
        },
        underline: {
            class: Underline as unknown as InlineToolConstructable,
            shortcut: 'CMD+U',
        },
        quote: {
            class: Quote as unknown as BlockToolConstructable,
            inlineToolbar: true,
            config: {
                quotePlaceholder: 'Enter a quote',
                captionPlaceholder: "Quote's author",
                enableLineBreaks: true,
            },
        },
        delimiter: {
            class: Delimiter as unknown as ToolConstructable,
            config: {
                styleOptions: ['star', 'dash', 'line'],
                defaultStyle: 'line',
                lineWidthOptions: [8, 15, 25, 35, 50, 60, 100],
                defaultLineWidth: 100,
                lineThicknessOptions: [1, 2, 3, 4, 5, 6],
                defaultLineThickness: 1,
            }
        },
        nestedList: NestedList as unknown as ToolConstructable,
        checklist: {
            class: Checklist as unknown as ToolConstructable,
            inlineToolbar: true,
            config: {
                defaultStyle: 'unordered',
            },
        },
        image: {
            class: Image as unknown as ToolConstructable,
            config: {
                uploader: {
                    /**
                     * @param {File} file
                     * @returns {Promise<{ success: number, file: { url: string } }>}
                     */
                    uploadByFile: async (file: File) => {
                        try {
                            const response = await uploadImage(file);
                            return response;
                        } catch (error) {
                            console.error('Image upload failed:', error);
                            throw error;
                        }
                    },
                },
                tunes: ['resize'],
            },
        },
        table: Table as unknown as ToolConstructable,
        marker: {
            class: Marker as unknown as InlineToolConstructable,
            shortcut: 'CMD+M',
        },
        warning: {
            class: Warning as unknown as BlockToolConstructable,
            config: {
                titlePlaceholder: 'Enter warning title',
                messagePlaceholder: 'Enter warning message',
            },
            inlineToolbar: true,
        },
        embed: {
            class: Embed as unknown as ToolConstructable,
        }
    };
}
