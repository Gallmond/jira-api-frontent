<script lang="ts">
    export let doc: AtlassianDoc

    const markStyles = (markTypes: {type: string}[]): string => {
        const styleParts: Record<string, string> = {
            'strong' : 'font-weight:bold'
        }

        return markTypes
            .map(markType => {
                if(!styleParts[markType.type]){
                    throw new Error(`No style for mark type ${markType.type}`)
                }

                return styleParts[markType.type]
            })
            .join(';')
    }

    const descriptionContent = doc.content
</script>

{#each descriptionContent as content}
    {#if content.type === 'paragraph'}
        <p>
            {#each content.content as paragraphContent}
                {#if paragraphContent.type === 'text'}
                    <span style="{markStyles(paragraphContent.marks ?? [])}">{paragraphContent.text}</span>
                {/if}
            {/each}
        </p>
    {/if}
{/each}