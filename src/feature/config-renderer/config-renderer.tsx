import { Button } from "@/components/ui/button";

const ConfigRender = ({ config }: any) => {
    const { layout, components } = config;

    // Function to compute dynamic styles based on column/row layout
    const computeLayoutStyles = (layout: any) => {
        const { column, row, gap } = layout;
        return {
            display: 'grid',
            gridTemplateColumns: `repeat(${column || 1}, 1fr)`,  // Dynamically set columns
            gridTemplateRows: row ? `repeat(${row}, 1fr)` : 'auto',  // Dynamically set rows (or auto if not provided)
            gap: gap || '10px',
            width: "100%",
            padding: "10px",
        };
    };

    const ComponentFactory = ({ type, children, style, content, ctaLabel, layout }: any) => {
        // Merge layout styles dynamically for section or any component with its own layout
        let componentStyle = { ...style };
        if (layout) {
            componentStyle = { ...componentStyle, ...computeLayoutStyles(layout) };
        }

        switch (type) {
            case "table":
                return <>table</>;
            case "form":
                return <>form</>;
            case "section":
                return (
                    <section style={componentStyle}>
                        {children && children.map((child: any, index: number) => (
                            <ComponentFactory key={index} {...child} />
                        ))}
                    </section>
                );
            case "h1":
                return <h1 style={style}>{content}</h1>;
            case "h2":
                return <h2 style={style}>{content}</h2>;
            case "h3":
                return <h3 style={style}>{content}</h3>;
            case "h4":
                return <h4 style={style}>{content}</h4>;
            case "h5":
                return <h5 style={style}>{content}</h5>;
            case "h6":
                return <h6 style={style}>{content}</h6>;
            case "card":
                return <div style={style}>Card Content</div>;
            case "button":
                return <Button style={style}>{ctaLabel}</Button>;
            default:
                return null;
        }
    };

    const mainStyle = computeLayoutStyles(layout);

    return (
        <div style={mainStyle}>
            {components?.map((component: any, index: number) => (
                <ComponentFactory key={index} {...component} />
            ))}
        </div>
    );
};

ConfigRender.displayName = 'ConfigRender';

export default ConfigRender;
