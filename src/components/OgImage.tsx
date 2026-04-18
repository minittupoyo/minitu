import React from "react";

type Props = {
    title: string;
    description?: string;
    date?: string;
    tags?: string[];
    siteName: string;
};

export const OgImage = ({ title, description, date, tags = [], siteName }: Props) => {
    return (
        <div className="w-[1200px] h-[630px] flex flex-col bg-white justify-center text-slate-900 p-24 relative">
            {/* Background Decorative Element */}
            <div 
                className="absolute -top-[10%] -right-[10%] w-[400px] h-[400px] rounded-full opacity-50"
                style={{
                    backgroundImage: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                    zIndex: -1,
                }}
            />

            <div className="flex flex-col w-full">
                {date && (
                    <div className="text-[24px] font-medium text-slate-500 mb-4 tracking-wider">
                        {date}
                    </div>
                )}
                <h1 className="text-[72px] font-bold text-slate-900 leading-[1.1] mb-6 overflow-hidden">
                    {title}
                </h1>
                {description && (
                    <p className="text-[32px] font-medium text-slate-600 leading-relaxed max-w-[900px] overflow-hidden">
                        {description}
                    </p>
                )}
            </div>

            <div className="flex flex-row items-center justify-between w-full mt-auto">
                <div className="flex flex-row gap-3">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-4 py-2 bg-slate-100 text-slate-600 text-[20px] font-medium rounded-lg"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
                <div className="text-[32px] font-bold text-slate-900">
                    {siteName}
                </div>
            </div>
        </div>
    );
};
