const codeInput =
    document.querySelector(
        "#codeInput"
    );

const analyzeBtn =
    document.querySelector(
        "#analyzeBtn"
    );

const exampleBtn =
    document.querySelector(
        "#exampleBtn"
    );

const clearBtn =
    document.querySelector(
        "#clearBtn"
    );

const scoreCard =
    document.querySelector(
        "#scoreCard"
    );

const statsCard =
    document.querySelector(
        "#statsCard"
    );

const analysisCard =
    document.querySelector(
        "#analysisCard"
    );

const scoreValue =
    document.querySelector(
        "#scoreValue"
    );

const analysisOutput =
    document.querySelector(
        "#analysisOutput"
    );
    initialize();

function initialize() {

    bindEvents();
}

function bindEvents() {

    analyzeBtn.addEventListener(
        "click",
        analyzeCode
    );

    exampleBtn.addEventListener(
        "click",
        loadExample
    );

    clearBtn.addEventListener(
        "click",
        clearReviewer
    );
}function bindEvents() {

    analyzeBtn.addEventListener(
        "click",
        analyzeCode
    );

    exampleBtn.addEventListener(
        "click",
        loadExample
    );

    clearBtn.addEventListener(
        "click",
        clearReviewer
    );
}

function analyzeCode() {

    const code =
        codeInput.value.trim();

    if (!code) {
        return;
    }

    const stats =
        collectStats(code);

    const review =
        generateReview(
            code,
            stats
        );

    renderStats(stats);

    renderReview(review);

    renderScore(review);
}

function collectStats(code) {

    return {

        lines:
            countLines(code),

        chars:
            code.length,

        functions:
            countFunctions(code),

        variables:
            countVariables(code),

        comments:
            countComments(code)
    };
}

function countLines(code) {

    return code
        .split("\n")
        .length;
}

function countFunctions(code) {

    const matches =
        code.match(
            /function\s+\w+/g
        );

    return matches
        ? matches.length
        : 0;
}

function countVariables(code) {

    const matches =
        code.match(
            /(const|let|var)\s+/g
        );

    return matches
        ? matches.length
        : 0;
}

function countComments(code) {

    const matches =
        code.match(
            /(\/\/|\/\*)/g
        );

    return matches
        ? matches.length
        : 0;
}

function generateReview(
    code,
    stats
) {

    const review = [];

    checkFunctions(
        review,
        stats
    );

    checkComments(
        review,
        stats
    );

    checkGenericNames(
        review,
        code
    );

    checkIndentation(
        review,
        code
    );

    return review;
}

function checkFunctions(
    review,
    stats
) {

    review.push(

        stats.functions

        ? success(
            "Functions detected"
        )

        : warning(
            "No functions detected"
        )
    );
}

function checkComments(
    review,
    stats
) {

    review.push(

        stats.comments

        ? success(
            "Comments detected"
        )

        : warning(
            "No comments detected"
        )
    );
}

function checkGenericNames(
    review,
    code
) {

    const generic =
        /function\s+(test|temp|demo)/i;

    if (
        generic.test(code)
    ) {

        review.push(
            warning(
                "Generic function name detected"
            )
        );
    }
}

function checkIndentation(
    review,
    code
) {

    const lines =
        code.split("\n");

    const valid =
        lines.every(
            line =>
                !line.startsWith(" ")
                ||
                line.startsWith("    ")
        );

    review.push(

        valid

        ? success(
            "Consistent indentation"
        )

        : warning(
            "Indentation issues detected"
        )
    );
}

function success(text) {

    return `

<div class="review-success">

    ✓ ${text}

</div>

`;
}

function warning(text) {

    return `

<div class="review-warning">

    ⚠ ${text}

</div>

`;
}function warning(text) {

    return `

<div class="review-warning">

    ⚠ ${text}

</div>

`;
}

function renderScore(
    review
) {

    let score = 100;

    const warnings =
        review.filter(
            item =>
                item.includes(
                    "⚠"
                )
        ).length;

    score -=
        warnings * 10;

    score =
        Math.max(
            score,
            0
        );

    scoreCard.classList.remove(
        "hidden"
    );

    scoreValue.textContent =
        score;
}

function renderStats(
    stats
) {

    statsCard.classList.remove(
        "hidden"
    );

    setText(
        "#lineCount",
        stats.lines
    );

    setText(
        "#charCount",
        stats.chars
    );

    setText(
        "#functionCount",
        stats.functions
    );

    setText(
        "#variableCount",
        stats.variables
    );

    setText(
        "#commentCount",
        stats.comments
    );
}

function renderReview(
    review
) {

    analysisCard.classList.remove(
        "hidden"
    );

    analysisOutput.innerHTML =

        `
<div class="review-title">

🤖 AptiQ Analysis

</div>

${review.join("")}
`;
}

function setText(
    selector,
    value
) {

    document
        .querySelector(
            selector
        )
        .textContent =
            value;
}

function setText(
    selector,
    value
) {

    document
        .querySelector(
            selector
        )
        .textContent =
            value;
}

function loadExample() {

    codeInput.value =

`function test() {

    console.log(
        "Hello World"
    );

}`;
}

function clearReviewer() {

    codeInput.value = "";

    scoreCard.classList.add(
        "hidden"
    );

    statsCard.classList.add(
        "hidden"
    );

    analysisCard.classList.add(
        "hidden"
    );
}