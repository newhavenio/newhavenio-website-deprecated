function BusinessValidator()
{
    this._valid = true;
    this._errors = false;
}

BusinessValidator.prototype.valid = function(req)
{
    // Reset on each call
    this._valid = true;
    this._errors = false;

    // Title
    req.assert('title', 'Title required').notNull();
    req.sanitize('title').trim();
    req.sanitize('title').xss();

    // Location
    req.assert('location', 'Location required').notNull();
    req.sanitize('location').trim();
    req.sanitize('location').xss();

    // Tech Stack
    req.assert('stack', 'Tech Stack required').notNull();
    req.sanitize('stack').trim();
    req.sanitize('stack').xss();

    // Image
    req.sanitize('image').xss(true);

    // Category
    req.assert('category', 'Category required').notNull();
    req.sanitize('category').trim();
    req.sanitize('category').xss();

    // Careers Page URL (Not required)
    req.assert('career_page').isUrl();
    req.sanitize('career_page').trim();
    req.sanitize('career_page').xss();

    var errors = req.validationErrors();

    if( errors )
    {
        this._valid = false;
        this._errors = errors;
    }

    return this._valid;
}

BusinessValidator.prototype.errors = function()
{
    return this._errors;
}

module.exports = BusinessValidator;