import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { render } from "takumi-js";
import { OgImage } from "@/components/OgImage";
import { loadDefaultJapaneseParser } from "budoux";
import stylesheet from "@/styles/global.css?inline";
import React from "react";
import fs from "node:fs";
import path from "node:path";
import { siteConfig } from "@/site.config";

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getCollection("blog");
    return posts.map((post) => ({
        params: { id: post.id },
        props: { post },
    }));
};

export const GET: APIRoute = async ({ props }) => {
    const { post } = props as { post: CollectionEntry<"blog"> };
    console.log("Stylesheet Length:", stylesheet.length);
    console.log("Stylesheet Snippet:", stylesheet.slice(0, 100));
    const parser = loadDefaultJapaneseParser();
    
    // Use ZWSP for better line breaks in Satori/Takumi
    const title = parser.parse(post.data.title).join("\u200B");
    const description = post.data.description 
        ? parser.parse(post.data.description).join("\u200B") 
        : undefined;
    
    const date = post.data.date.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    
    const tags = post.data.tags?.map((t) => t.tag).slice(0, 3) || [];

    try {
        const fontsPath = path.join(process.cwd(), "src/assets/fonts");
        const mediumFont = fs.readFileSync(path.join(fontsPath, "NotoSansJP-Medium.ttf"));
        const boldFont = fs.readFileSync(path.join(fontsPath, "NotoSansJP-Bold.ttf"));

        const buffer = await render(
            React.createElement(OgImage, { 
                title, 
                description, 
                date, 
                tags, 
                siteName: siteConfig.siteName 
            }),
            {
                width: 1200,
                height: 630,
                format: "png",
                stylesheets: [stylesheet],
                fonts: [
                    {
                        name: "Noto Sans JP",
                        weight: 500,
                        data: mediumFont,
                        style: "normal",
                    },
                    {
                        name: "Noto Sans JP",
                        weight: 700,
                        data: boldFont,
                        style: "normal",
                    },
                ],
            }
        );

        return new Response(new Uint8Array(buffer), {
            headers: {
                "Content-Type": "image/png",
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("OG Image Generation Error:", error);
        return new Response(`Error generating image: ${error instanceof Error ? error.message : String(error)}`, {
            status: 500,
            headers: { "Content-Type": "text/plain" }
        });
    }
};
