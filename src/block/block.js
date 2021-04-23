/**
 * BLOCK: test-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { RichText } from "@wordpress/block-editor";

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("cgb/block-test-block", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("test-block - CGB Block"), // Block title.
	icon: "shield", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__("test-block — CGB Block"),
		__("CGB Example"),
		__("create-guten-block"),
	],
	/**
	 * Attribute matchers!
	 *
	 * Attribute matchers are used to define the strategy by which block
	 * attribute values are extracted from saved post content. They provide
	 * a mechanism to map from the saved markup to a JavaScript representation
	 * of a block.
	 *
	 * children() — Use children to extract child nodes of the matched element,
	 * returned as an array of virtual elements. This is most commonly used in
	 * combination with the Editable component.
	 *
	 * Example: Extract child nodes from a paragraph of rich text.
	 */
	attributes: {
		content: {
			type: "array",
			source: "children",
			selector: "p",
		},
	},
	example: {
		attributes: {
			content: __("Hello world"),
		},
	},
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: (props) => {
		const {
			attributes: { content },
			setAttributes,
			className,
		} = props;
		const onChangeContent = (newContent) => {
			setAttributes({ content: newContent });
		};

		return (
			<RichText
				tagName="p"
				className={className}
				onChange={onChangeContent}
				value={content}
			/>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: (props) => {
		return <RichText.Content tagName="p" value={props.attributes.content} />;
	},
});
