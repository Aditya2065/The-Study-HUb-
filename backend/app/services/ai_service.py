def summarize_text(text: str) -> str:
    words = text.split()
    clipped = " ".join(words[:35])
    return (
        f"Quick Summary: {clipped}... "
        "Focus on concepts, practical implementation, and revision checkpoints."
    )


def generate_quiz(topic: str) -> list[str]:
    return [
        f"What is the primary objective of {topic}?",
        f"List two practical applications of {topic}.",
        f"Which data structures are commonly used in {topic}?",
        f"How would you optimize a basic {topic} workflow?",
        f"Mention one limitation and one improvement area of {topic}.",
    ]
